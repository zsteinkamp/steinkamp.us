import yaml from 'js-yaml'
import fsp from 'fs/promises'
import Head from 'next/head'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Impact = 'S' | 'M' | 'L'

// Per-repo git stats for a day. Older entries may still be bare strings, so the
// page normalizes either form to a Project before rendering.
interface Project {
  name: string
  commits?: number
  ins?: number
  del?: number
}

interface Entry {
  date: string
  impact: Impact
  summary: string
  projects?: (string | Project)[]
  // Optional "image of the day" — a representative screenshot for the day,
  // resized into public/images/devdiary/ by bin/devdiary-images. See CLAUDE.md.
  image?: string
  imageAlt?: string
}

const asProject = (p: string | Project): Project =>
  typeof p === 'string' ? { name: p } : p

export const getStaticProps = async () => {
  const raw = (yaml.load(await fsp.readFile('data/devdiary.yaml', 'utf8')) ||
    []) as Entry[]

  // Coerce dates to strings (YAML may parse them as Dates) and sort ascending.
  const entries = raw
    .map((e) => ({ ...e, date: String(e.date).slice(0, 10) }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // ISR: re-read data/devdiary.yaml at runtime (at most once/min); the prod
  // container bind-mounts ./data (see docker-compose.yml). NOTE: entries can now
  // carry an `image:` served from public/images/devdiary/, which is baked into
  // the build (not mounted) — so a diary update with an image needs a full
  // `make deploy`, not a bare `git pull`. See CLAUDE.md.
  return { props: { entries }, revalidate: 60 }
}

const IMPACT_LABEL: Record<Impact, string> = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
}

// Cell color ramps with impact. Empty days are barely-there.
const cellClass = (impact?: Impact) => {
  switch (impact) {
    case 'S':
      return 'bg-emerald-200 dark:bg-emerald-900'
    case 'M':
      return 'bg-emerald-400 dark:bg-emerald-700'
    case 'L':
      return 'bg-emerald-600 dark:bg-emerald-400'
    default:
      return 'bg-black/5 dark:bg-white/5'
  }
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const iso = (d: Date) => d.toISOString().slice(0, 10)

// Project names are GitHub repo slugs under github.com/zsteinkamp. The `.ORIG`
// suffix marks a local-only variant whose real repo drops it.
const repoUrl = (project: string) =>
  `https://github.com/zsteinkamp/${project.replace(/\.ORIG$/, '')}`

// Build a GitHub-style week grid for a single year. Returns columns of 7 days
// (Sun..Sat); days outside the year are null.
const buildYearWeeks = (year: number) => {
  const start = new Date(Date.UTC(year, 0, 1))
  start.setUTCDate(start.getUTCDate() - start.getUTCDay()) // back up to Sunday
  const end = new Date(Date.UTC(year, 11, 31))

  const weeks: (string | null)[][] = []
  const cursor = new Date(start)
  while (cursor <= end || cursor.getUTCDay() !== 0) {
    const col = weeks[weeks.length - 1]
    const day = cursor.getUTCFullYear() === year ? iso(cursor) : null
    if (cursor.getUTCDay() === 0 || weeks.length === 0) {
      weeks.push([day])
    } else {
      col.push(day)
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return weeks
}

// Memoized so a moving highlight only re-renders the two years it touches:
// the parent passes `activeDate` scoped to this year (null otherwise) and a
// per-year `isActiveYear` boolean, so unaffected years see identical props.
const YearGrid: React.FC<{
  year: number
  byDate: Record<string, Entry>
  isActiveYear: boolean
  onPickYear: (year: number) => void
}> = memo(({ year, byDate, isActiveYear, onPickYear }) => {
  const weeks = buildYearWeeks(year)
  return (
    <div className='shrink-0' data-year={year}>
      <h3
        onClick={() => onPickYear(year)}
        className={`mb-2 cursor-pointer transition-colors ${
          isActiveYear
            ? 'font-semibold text-emerald-600 dark:text-emerald-400'
            : 'hover:text-emerald-600 dark:hover:text-emerald-400'
        }`}
      >
        {year}
      </h3>
      <div className='flex gap-[3px] pb-2'>
        {weeks.map((week, wi) => (
          <div key={wi} className='flex flex-col gap-[3px]'>
            {Array.from({ length: 7 }).map((_, di) => {
              const date = week[di] ?? null
              const entry = date ? byDate[date] : undefined
              // Mark the first of each month for a month-boundary rhythm.
              const firstOfMonth = !!date && date.endsWith('-01')
              const title = date
                ? entry
                  ? `${date} — ${IMPACT_LABEL[entry.impact]}: ${entry.summary}`
                  : date
                : ''
              const cell = (
                <div
                  title={title}
                  data-date={entry ? date : undefined}
                  className={`h-[12px] w-[12px] rounded-[2px] ${cellClass(
                    entry?.impact
                  )} ${date ? '' : 'opacity-0'} ${
                    firstOfMonth
                      ? 'outline outline-1 outline-offset-1 outline-date-lite'
                      : ''
                  }`}
                />
              )
              return entry ? (
                <a key={di} href={`#d-${date}`} aria-label={title}>
                  {cell}
                </a>
              ) : (
                <div key={di}>{cell}</div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
})
YearGrid.displayName = 'YearGrid'

interface DiaryProps {
  entries: Entry[]
}

const DevDiary: React.FC<DiaryProps> = ({ entries }) => {
  const gridRef = useRef<HTMLDivElement>(null) // horizontal scroller
  const journalRef = useRef<HTMLDivElement>(null)

  // Stable across renders so the memoized YearGrids don't all re-render when
  // only the highlight moves.
  const byDate = useMemo(() => {
    const m: Record<string, Entry> = {}
    entries.forEach((e) => {
      m[e.date] = e
    })
    return m
  }, [entries])

  // Years present, newest first.
  const years = useMemo(
    () =>
      Array.from(new Set(entries.map((e) => Number(e.date.slice(0, 4))))).sort(
        (a, b) => b - a
      ),
    [entries]
  )

  const [activeDate, setActiveDate] = useState<string | null>(
    entries.length ? entries[entries.length - 1].date : null
  )
  const activeDateRef = useRef(activeDate)
  const setActive = (d: string | null) => {
    if (!d || d === activeDateRef.current) return
    activeDateRef.current = d
    setActiveDate(d)
  }

  // Lightbox: clicking a day's thumbnail opens the full image as an overlay.
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  )
  useEffect(() => {
    if (!lightbox) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  // The scroll positions of the two panes are linked by a single shared
  // variable: the timeline position. Each entry is one knot with a known grid
  // x (content coords) and journal y (document coords); between knots we
  // interpolate linearly, so the formula maps any scroll in one pane straight
  // to a position in the other. Measured once (and on resize).
  const knots = useRef<{ gx: number[]; jy: number[] }>({ gx: [], jy: [] })

  // One-directional lock so a programmatic scroll doesn't echo back and fight.
  const lock = useRef<{ src: 'grid' | 'journal' | null; t: number }>({
    src: null,
    t: 0,
  })
  const guarded = (self: 'grid' | 'journal') =>
    lock.current.src !== null &&
    lock.current.src !== self &&
    performance.now() - lock.current.t < 160
  const hold = (self: 'grid' | 'journal') => {
    lock.current = { src: self, t: performance.now() }
  }

  const headerH = () => gridRef.current?.offsetHeight ?? 0

  // Piecewise-linear lookup: given v in the `from` knots (monotonic), return
  // the matching position in the `to` knots.
  const interp = (from: number[], to: number[], v: number) => {
    const n = from.length
    if (n === 0) return 0
    const asc = from[0] < from[n - 1]
    const lo = asc ? from[0] : from[n - 1]
    const hi = asc ? from[n - 1] : from[0]
    if (v <= lo) return asc ? to[0] : to[n - 1]
    if (v >= hi) return asc ? to[n - 1] : to[0]
    // Binary search for the bracketing knot pair.
    let a = 0
    let b = n - 1
    while (b - a > 1) {
      const mid = (a + b) >> 1
      const between = asc ? from[mid] <= v : from[mid] >= v
      if (between) a = mid
      else b = mid
    }
    const span = from[b] - from[a]
    const f = span === 0 ? 0 : (v - from[a]) / span
    return to[a] + f * (to[b] - to[a])
  }

  const measure = () => {
    const sc = gridRef.current
    const jr = journalRef.current
    if (!sc || !jr) return
    const scRect = sc.getBoundingClientRect()
    const sl = sc.scrollLeft
    const gx: number[] = []
    const jy: number[] = []
    // entries are sorted ascending by date; emit knots in that order so both
    // arrays stay monotonic (gx increases, jy decreases — newest on top).
    entries.forEach((e) => {
      const g = sc.querySelector<HTMLElement>(`[data-date="${e.date}"]`)
      const j = jr.querySelector<HTMLElement>(`[data-jday="${e.date}"]`)
      if (!g || !j) return
      const gr = g.getBoundingClientRect()
      gx.push(gr.left - scRect.left + sl + gr.width / 2)
      jy.push(j.getBoundingClientRect().top + window.scrollY)
    })
    knots.current = { gx, jy }
  }

  // Entry date whose knot is closest to v in the given axis — used directly
  // (grid center → gx, journal threshold → jy) so the highlight tracks the
  // actual entry rather than a re-projected one.
  const nearestDate = (arr: number[], v: number) => {
    if (!arr.length) return activeDateRef.current
    let best = 0
    let bestD = Infinity
    for (let i = 0; i < arr.length; i++) {
      const d = Math.abs(arr[i] - v)
      if (d < bestD) {
        bestD = d
        best = i
      }
    }
    return entries[best]?.date ?? activeDateRef.current
  }

  useEffect(() => {
    measure()
    // Start at the most recent entry (rightmost in the grid).
    const sc = gridRef.current
    if (sc) sc.scrollLeft = sc.scrollWidth
    // Web-font swap shifts journal heights; re-measure once it settles.
    document.fonts?.ready.then(measure).catch(() => {})
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Journal scroll → drive the grid to the matching timeline x.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (guarded('journal')) return
        const sc = gridRef.current
        const { gx, jy } = knots.current
        if (!sc || gx.length < 2) return
        const target = window.scrollY + headerH() + 16 // doc-y under the grid
        const gxTarget = interp(jy, gx, target)
        const clamped = Math.max(
          0,
          Math.min(
            gxTarget - sc.clientWidth / 2,
            sc.scrollWidth - sc.clientWidth
          )
        )
        setActive(nearestDate(jy, target)) // highlight the entry at the threshold
        if (Math.abs(sc.scrollLeft - clamped) > 1) {
          hold('journal')
          sc.scrollTo({ left: clamped })
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Grid scroll → drive the journal to the matching timeline y.
  useEffect(() => {
    const sc = gridRef.current
    if (!sc) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (guarded('grid')) return
        const { gx, jy } = knots.current
        if (gx.length < 2) return
        const center = sc.scrollLeft + sc.clientWidth / 2
        const yTarget = interp(gx, jy, center) - headerH() - 16
        setActive(nearestDate(gx, center))
        const clamped = Math.max(0, yTarget)
        if (Math.abs(window.scrollY - clamped) > 1) {
          hold('grid')
          window.scrollTo({ top: clamped })
        }
      })
    }
    sc.addEventListener('scroll', onScroll, { passive: true })
    return () => sc.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Jump both panes to a year (its newest entry). Stable identity so the
  // memoized YearGrids aren't invalidated every render.
  const pickYear = useCallback((year: number) => {
    const e = [...entries].reverse().find((x) => x.date.startsWith(`${year}-`))
    if (!e) return
    const el = journalRef.current?.querySelector<HTMLElement>(
      `[data-jday="${e.date}"]`
    )
    if (!el) return
    setActive(e.date)
    hold('grid') // suppress the journal handler's echo; grid will follow
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - headerH() - 16,
      behavior: 'smooth',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeYear = activeDate ? Number(activeDate.slice(0, 4)) : years[0]

  // Group entries newest-first into year -> month -> [entries].
  const desc = [...entries].reverse()
  const byYear = new Map<number, Map<number, Entry[]>>()
  desc.forEach((e) => {
    const y = Number(e.date.slice(0, 4))
    const m = Number(e.date.slice(5, 7)) - 1
    if (!byYear.has(y)) byYear.set(y, new Map())
    const months = byYear.get(y)!
    if (!months.has(m)) months.set(m, [])
    months.get(m)!.push(e)
  })

  return (
    <article>
      <Head>
        <title>Dev Diary — Zack Steinkamp</title>
        <meta
          name='description'
          content='A daily log of what I worked on, with a Small/Medium/Large impact rating.'
        />
      </Head>
      <h1>Dev Diary</h1>
      <p>
        A running log of what I build day to day across my projects. Each day
        gets a sentence or two and a Small / Medium / Large impact rating.
      </p>

      <section
        ref={gridRef}
        className='sticky top-0 z-20 flex gap-8 overflow-x-auto border-b border-border bg-pagebg pb-2 pt-2'
      >
        {[...years].reverse().map((y) => (
          <YearGrid
            key={y}
            year={y}
            byDate={byDate}
            isActiveYear={y === activeYear}
            onPickYear={pickYear}
          />
        ))}
      </section>

      <section ref={journalRef} className='mt-4'>
        {Array.from(byYear.keys()).map((y) => (
          <div key={y} data-jyear={y}>
            <h2>{y}</h2>
            {Array.from(byYear.get(y)!.keys()).map((m) => (
              <div key={m} className='mb-6'>
                <h3 className='text-date'>{MONTHS[m]}</h3>
                {byYear
                  .get(y)!
                  .get(m)!
                  .map((e) => (
                    <div
                      key={e.date}
                      id={`d-${e.date}`}
                      data-jday={e.date}
                      className='grid scroll-mt-[170px] grid-cols-[3.5rem,1fr] gap-3 border-b border-border py-3'
                    >
                      <div className='text-right'>
                        <div className='text-date'>{e.date.slice(8, 10)}</div>
                        <span
                          title={IMPACT_LABEL[e.impact]}
                          className={`mt-1 inline-block h-[12px] w-[12px] rounded-[2px] ${cellClass(
                            e.impact
                          )}`}
                        />
                      </div>
                      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                        <div className='min-w-0 flex-1'>
                          <ReactMarkdown className='diary-summary'>
                            {e.summary}
                          </ReactMarkdown>
                          {e.projects && e.projects.length > 0 && (
                            <div className='mt-1 flex flex-wrap gap-2 text-sm text-date-lite'>
                              {e.projects.map(asProject).map((p) => (
                                <a
                                  key={p.name}
                                  href={repoUrl(p.name)}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  title={
                                    p.commits != null
                                      ? `${p.commits} commit${
                                          p.commits === 1 ? '' : 's'
                                        }, +${p.ins ?? 0}/-${p.del ?? 0} lines`
                                      : undefined
                                  }
                                  className='inline-flex items-center gap-1.5 rounded bg-shadebg px-2 py-[1px] hover:underline'
                                >
                                  <span>{p.name}</span>
                                  {p.commits != null && (
                                    <span className='font-mono text-xs opacity-70'>
                                      {p.commits}c
                                      <span className='ml-1 text-emerald-600 dark:text-emerald-400'>
                                        +{p.ins ?? 0}
                                      </span>
                                      <span className='ml-0.5 text-red-500 dark:text-red-400'>
                                        -{p.del ?? 0}
                                      </span>
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        {e.image && (
                          <button
                            type='button'
                            onClick={() =>
                              setLightbox({
                                src: e.image!,
                                alt: e.imageAlt || `${e.date} screenshot`,
                              })
                            }
                            className='block shrink-0 cursor-zoom-in'
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={e.image}
                              alt={e.imageAlt || `${e.date} screenshot`}
                              loading='lazy'
                              className='max-h-32 rounded-md border border-border sm:max-w-[14rem]'
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          role='dialog'
          aria-modal='true'
          aria-label={lightbox.alt}
          className='fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className='max-h-[90vh] max-w-[90vw] rounded-md shadow-2xl'
          />
        </div>
      )}
    </article>
  )
}

export default DevDiary
