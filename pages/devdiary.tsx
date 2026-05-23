import yaml from 'js-yaml'
import fsp from 'fs/promises'
import Head from 'next/head'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Impact = 'S' | 'M' | 'L'

interface Entry {
  date: string
  impact: Impact
  summary: string
  projects?: string[]
}

export const getStaticProps = async () => {
  const raw = (yaml.load(await fsp.readFile('data/devdiary.yaml', 'utf8')) ||
    []) as Entry[]

  // Coerce dates to strings (YAML may parse them as Dates) and sort ascending.
  const entries = raw
    .map((e) => ({ ...e, date: String(e.date).slice(0, 10) }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return { props: { entries } }
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

const YearGrid: React.FC<{ year: number; byDate: Record<string, Entry> }> = ({
  year,
  byDate,
}) => {
  const weeks = buildYearWeeks(year)
  return (
    <div className='mb-6'>
      <h3 className='mb-2'>{year}</h3>
      <div className='flex gap-[3px] overflow-x-auto pb-2'>
        {weeks.map((week, wi) => (
          <div key={wi} className='flex flex-col gap-[3px]'>
            {Array.from({ length: 7 }).map((_, di) => {
              const date = week[di] ?? null
              const entry = date ? byDate[date] : undefined
              const title = date
                ? entry
                  ? `${date} — ${IMPACT_LABEL[entry.impact]}: ${entry.summary}`
                  : date
                : ''
              const cell = (
                <div
                  title={title}
                  className={`h-[12px] w-[12px] rounded-[2px] ${cellClass(
                    entry?.impact
                  )} ${date ? '' : 'opacity-0'}`}
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
}

interface DiaryProps {
  entries: Entry[]
}

const DevDiary: React.FC<DiaryProps> = ({ entries }) => {
  const [view, setView] = useState<'both' | 'grid' | 'journal'>('both')

  const byDate: Record<string, Entry> = {}
  entries.forEach((e) => {
    byDate[e.date] = e
  })

  // Years present, newest first.
  const years = Array.from(
    new Set(entries.map((e) => Number(e.date.slice(0, 4))))
  ).sort((a, b) => b - a)

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

  const tab = (key: typeof view, label: string) => (
    <button
      onClick={() => setView(key)}
      className={`rounded-lg px-3 py-1 text-sm ${
        view === key
          ? 'bg-mid text-thumb-text'
          : 'bg-shadebg text-shadetext hover:text-header'
      }`}
    >
      {label}
    </button>
  )

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

      <div className='mb-6 flex gap-2'>
        {tab('both', 'Grid + Journal')}
        {tab('grid', 'Grid')}
        {tab('journal', 'Journal')}
      </div>

      {view !== 'journal' && (
        <section>
          {years.map((y) => (
            <YearGrid key={y} year={y} byDate={byDate} />
          ))}
        </section>
      )}

      {view !== 'grid' && (
        <section className='mt-4'>
          {Array.from(byYear.keys()).map((y) => (
            <div key={y}>
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
                        className='grid scroll-mt-12 grid-cols-[3.5rem,1fr] gap-3 border-b border-border py-3'
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
                        <div>
                          <ReactMarkdown className='diary-summary'>
                            {e.summary}
                          </ReactMarkdown>
                          {e.projects && e.projects.length > 0 && (
                            <div className='mt-1 flex flex-wrap gap-2 text-sm text-date-lite'>
                              {e.projects.map((p) => (
                                <span
                                  key={p}
                                  className='rounded bg-shadebg px-2 py-[1px]'
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}

export default DevDiary
