import yaml from 'js-yaml'
import fsp from 'fs/promises'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

// One point per calendar month: totals across all repos that month.
interface MonthPoint {
  month: string // 'YYYY-MM'
  commits: number
  ins: number // lines added
  del: number // lines removed
}

// Stacked monthly breakdown by repo. `repos` is the stack order (most commits
// all-time first); `values[i]` and `totals` align to `repos`.
interface Stack {
  months: string[]
  repos: string[]
  values: number[][]
  totals: number[]
}

// The most-committed repo of each year gets a distinct color and a callout.
interface Champions {
  colors: Record<string, string> // repo -> hex
  byYear: { year: string; repo: string; commits: number }[]
}

interface Project {
  name?: string
  commits?: number
  ins?: number
  del?: number
}

interface Entry {
  date: string
  projects?: (string | Project)[]
}

// Build a gap-free run of 'YYYY-MM' strings from first..last inclusive.
const monthsBetween = (first: string, last: string): string[] => {
  const out: string[] = []
  let [y, m] = first.split('-').map(Number)
  const [ly, lm] = last.split('-').map(Number)
  while (y < ly || (y === ly && m <= lm)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`)
    m += 1
    if (m > 12) {
      m = 1
      y += 1
    }
  }
  return out
}

export const getStaticProps = async () => {
  const raw = (yaml.load(await fsp.readFile('data/devdiary.yaml', 'utf8')) ||
    []) as Entry[]

  // month -> repo -> commits, plus per-year and all-time repo totals, and
  // per-month line churn (added/removed).
  const monthly: Record<string, Record<string, number>> = {}
  const yearly: Record<string, Record<string, number>> = {}
  const totals: Record<string, number> = {}
  const churn: Record<string, { ins: number; del: number }> = {}
  for (const e of raw) {
    const month = String(e.date).slice(0, 7)
    const year = month.slice(0, 4)
    for (const p of e.projects ?? []) {
      if (typeof p === 'string') continue
      const name = p.name ?? 'unknown'
      const c = p.commits ?? 0
      ;(monthly[month] ??= {})[name] = (monthly[month]?.[name] ?? 0) + c
      ;(yearly[year] ??= {})[name] = (yearly[year]?.[name] ?? 0) + c
      totals[name] = (totals[name] ?? 0) + c
      const ch = (churn[month] ??= { ins: 0, del: 0 })
      ch.ins += p.ins ?? 0
      ch.del += p.del ?? 0
    }
  }

  const presentMonths = Object.keys(monthly).sort()
  const months =
    presentMonths.length === 0
      ? []
      : monthsBetween(presentMonths[0], presentMonths[presentMonths.length - 1])

  // Per-month totals (commits for the line chart, ins/del for the churn chart).
  const series: MonthPoint[] = months.map((month) => ({
    month,
    commits: Object.values(monthly[month] ?? {}).reduce((s, c) => s + c, 0),
    ins: churn[month]?.ins ?? 0,
    del: churn[month]?.del ?? 0,
  }))

  // Every repo gets a band; stack order is biggest all-time first.
  const repos = Object.keys(totals).sort((a, b) => totals[b] - totals[a])
  const values = months.map((month) => {
    const m = monthly[month] ?? {}
    return repos.map((r) => m[r] ?? 0)
  })

  const stack: Stack = {
    months,
    repos,
    values,
    totals: repos.map((r) => totals[r]),
  }

  // Each year's most-committed repo. Distinct champion repos get a color,
  // assigned by all-time total so the busiest keeps a stable hue.
  const byYear = Object.keys(yearly)
    .sort()
    .map((year) => {
      const [repo, commits] = Object.entries(yearly[year]).sort(
        (a, b) => b[1] - a[1]
      )[0]
      return { year, repo, commits }
    })
  const championRepos = [...new Set(byYear.map((c) => c.repo))].sort(
    (a, b) => totals[b] - totals[a]
  )
  const colors: Record<string, string> = {}
  championRepos.forEach((repo, i) => {
    colors[repo] = CHAMPION_PALETTE[i % CHAMPION_PALETTE.length]
  })
  const champions: Champions = { colors, byYear }

  return { props: { series, stack, champions } }
}

// Round up to a "nice" axis maximum (1/2/5 × 10^n).
const niceMax = (v: number): number => {
  if (v <= 0) return 1
  const pow = Math.pow(10, Math.floor(Math.log10(v)))
  const n = v / pow
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10
  return step * pow
}

const W = 900
const H = 380
const PAD = { top: 20, right: 24, bottom: 36, left: 48 }
const PLOT_W = W - PAD.left - PAD.right
const PLOT_H = H - PAD.top - PAD.bottom

const BAND_COLOR = '#059669' // emerald-600
const opacityFor = (total: number, max: number) => 0.08 + 0.92 * (total / max)

// Distinct, non-green hues for repos that topped a year (avoids clashing with
// the emerald base). Assigned in getStaticProps by all-time commits.
const CHAMPION_PALETTE = [
  '#2563eb', // blue
  '#f59e0b', // amber
  '#db2777', // pink
  '#7c3aed', // violet
  '#ea580c', // orange
  '#0891b2', // cyan
  '#c026d3', // fuchsia
  '#65a30d', // lime
]

const xAt = (i: number, n: number) =>
  PAD.left + (n <= 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W)

// Year labels at January of each year present (plus the first month).
const yearTicks = (months: string[]) =>
  months
    .map((mo, i) => ({ i, year: mo.slice(0, 4), m: mo.slice(5) }))
    .filter((t) => t.m === '01' || t.i === 0)

const YGrid: React.FC<{ ticks: number[]; y: (v: number) => number }> = ({
  ticks,
  y,
}) => (
  <>
    {ticks.map((t) => (
      <g key={t}>
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={y(t)}
          y2={y(t)}
          className='stroke-border'
          strokeWidth={1}
        />
        <text
          x={PAD.left - 8}
          y={y(t)}
          dominantBaseline='middle'
          textAnchor='end'
          className='fill-date-lite text-[11px]'
        >
          {t}
        </text>
      </g>
    ))}
  </>
)

const XYears: React.FC<{ months: string[]; x: (i: number) => number }> = ({
  months,
  x,
}) => (
  <>
    {yearTicks(months).map((t) => (
      <text
        key={t.i}
        x={x(t.i)}
        y={H - PAD.bottom + 18}
        textAnchor='middle'
        className='fill-date-lite text-[11px]'
      >
        {t.year}
      </text>
    ))}
  </>
)

// Milestone markers drawn as dated vertical lines across the timeline.
const ANNOTATIONS = [
  { date: '2021-06-04', label: 'Max for Live' },
  { date: '2024-05-10', label: 'Retired' },
  { date: '2024-12-26', label: 'Knobbler App' },
  { date: '2026-02-04', label: 'Claude' },
]

const Annotations: React.FC<{ months: string[]; x: (i: number) => number }> = ({
  months,
  x,
}) => (
  <>
    {ANNOTATIONS.map((a) => {
      const idx = months.indexOf(a.date.slice(0, 7))
      if (idx < 0) return null
      // Interpolate within the month by day so the line lands on the date.
      const [y, m, d] = a.date.split('-').map(Number)
      const daysInMonth = new Date(y, m, 0).getDate()
      const px = x(idx + (d - 1) / daysInMonth)
      return (
        <g key={a.date}>
          <line
            x1={px}
            x2={px}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            className='stroke-date'
            strokeWidth={1}
            strokeDasharray='4 3'
          />
          <text
            x={px}
            y={PAD.top - 6}
            textAnchor='middle'
            className='fill-date text-[11px] font-medium'
          >
            {a.label}
          </text>
        </g>
      )
    })}
  </>
)

// Track the hovered month index from pointer position over the plot. Maps the
// client X back through the SVG's viewBox so it works at any rendered size.
const useHoverIdx = (n: number) => {
  const ref = useRef<SVGSVGElement>(null)
  const [idx, setIdx] = useState<number | null>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || n === 0) return
    const r = el.getBoundingClientRect()
    const svgX = ((e.clientX - r.left) / r.width) * W
    const i = Math.round(((svgX - PAD.left) / PLOT_W) * (n - 1))
    setIdx(Math.max(0, Math.min(n - 1, i)))
  }
  return { ref, idx, onMove, clear: () => setIdx(null) }
}

// In-SVG tooltip box. Flips to the left of the cursor near the right edge.
const Tooltip: React.FC<{
  px: number
  lines: { text: string; color?: string; muted?: boolean }[]
}> = ({ px, lines }) => {
  const lineH = 15
  const padX = 8
  const padY = 7
  const w =
    Math.max(...lines.map((l) => (l.color ? 14 : 0) + l.text.length * 6.1)) +
    padX * 2
  const h = lines.length * lineH + padY * 2
  const flip = px > PAD.left + PLOT_W * 0.62
  const bx = flip ? px - w - 10 : px + 10
  const by = PAD.top
  return (
    <g pointerEvents='none'>
      <rect
        x={bx}
        y={by}
        width={w}
        height={h}
        rx={5}
        className='fill-pagebg stroke-border'
        strokeWidth={1}
        opacity={0.97}
      />
      {lines.map((l, i) => (
        <g key={i}>
          {l.color && (
            <rect
              x={bx + padX}
              y={by + padY + i * lineH + 3}
              width={9}
              height={9}
              rx={2}
              fill={l.color}
            />
          )}
          <text
            x={bx + padX + (l.color ? 14 : 0)}
            y={by + padY + i * lineH + 11}
            className={
              l.muted ? 'fill-date-lite text-[11px]' : 'fill-text text-[11px]'
            }
          >
            {l.text}
          </text>
        </g>
      ))}
    </g>
  )
}

const CommitsByMonth: React.FC<{ series: MonthPoint[] }> = ({ series }) => {
  const n = series.length
  const yMax = niceMax(Math.max(1, ...series.map((p) => p.commits)))
  const x = (i: number) => xAt(i, n)
  const y = (v: number) => PAD.top + PLOT_H - (v / yMax) * PLOT_H
  const hover = useHoverIdx(n)

  const linePath = series
    .map(
      (p, i) =>
        `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.commits).toFixed(1)}`
    )
    .join(' ')
  const areaPath =
    n > 0
      ? `${linePath} L${x(n - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(
          1
        )},${y(0).toFixed(1)} Z`
      : ''

  const yt = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(yMax * f))
  const hp = hover.idx != null ? series[hover.idx] : null

  return (
    <svg
      ref={hover.ref}
      viewBox={`0 0 ${W} ${H}`}
      className='h-auto w-full'
      role='img'
      aria-label='Total commits per month'
    >
      <YGrid ticks={yt} y={y} />
      <XYears months={series.map((p) => p.month)} x={x} />
      <path d={areaPath} className='fill-emerald-500/10' />
      <path
        d={linePath}
        fill='none'
        className='stroke-emerald-500'
        strokeWidth={2}
        strokeLinejoin='round'
        strokeLinecap='round'
      />
      <Annotations months={series.map((p) => p.month)} x={x} />

      {hp && (
        <>
          <line
            x1={x(hover.idx!)}
            x2={x(hover.idx!)}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            className='stroke-date-lite'
            strokeWidth={1}
          />
          <circle
            cx={x(hover.idx!)}
            cy={y(hp.commits)}
            r={3.5}
            className='fill-emerald-500'
          />
          <Tooltip
            px={x(hover.idx!)}
            lines={[
              { text: hp.month },
              { text: `${hp.commits} commit${hp.commits === 1 ? '' : 's'}` },
            ]}
          />
        </>
      )}

      <rect
        x={PAD.left}
        y={PAD.top}
        width={PLOT_W}
        height={PLOT_H}
        fill='transparent'
        pointerEvents='all'
        onMouseMove={hover.onMove}
        onMouseLeave={hover.clear}
      />
    </svg>
  )
}

// Compact axis label: 13961 -> "14k", 1200 -> "1.2k".
const fmtK = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : String(v)

const ADD_COLOR = '#10b981' // emerald-500
const DEL_COLOR = '#ef4444' // red-500

// Diverging area: lines added rise above the zero line, lines removed drop
// below it, sharing the month x-axis with the commits chart above.
const LinesPerMonth: React.FC<{ series: MonthPoint[] }> = ({ series }) => {
  const n = series.length
  const yMax = niceMax(Math.max(1, ...series.flatMap((p) => [p.ins, p.del])))
  const x = (i: number) => xAt(i, n)
  const mid = PAD.top + PLOT_H / 2
  const half = PLOT_H / 2
  const up = (v: number) => mid - (v / yMax) * half // added (above)
  const down = (v: number) => mid + (v / yMax) * half // removed (below)
  const hover = useHoverIdx(n)

  const path = (
    accessor: (p: MonthPoint) => number,
    y: (v: number) => number
  ) =>
    series
      .map(
        (p, i) =>
          `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(accessor(p)).toFixed(1)}`
      )
      .join(' ')
  const close = (line: string) =>
    n > 0
      ? `${line} L${x(n - 1).toFixed(1)},${mid.toFixed(1)} L${x(0).toFixed(
          1
        )},${mid.toFixed(1)} Z`
      : ''

  const addLine = path((p) => p.ins, up)
  const delLine = path((p) => p.del, down)
  const hp = hover.idx != null ? series[hover.idx] : null

  // Symmetric ticks: +half, +full above; -half, -full below.
  const ticks = [
    { v: yMax, y: up(yMax), label: fmtK(yMax) },
    { v: yMax / 2, y: up(yMax / 2), label: fmtK(Math.round(yMax / 2)) },
    { v: 0, y: mid, label: '0' },
    { v: yMax / 2, y: down(yMax / 2), label: fmtK(Math.round(yMax / 2)) },
    { v: yMax, y: down(yMax), label: fmtK(yMax) },
  ]

  return (
    <svg
      ref={hover.ref}
      viewBox={`0 0 ${W} ${H}`}
      className='h-auto w-full'
      role='img'
      aria-label='Lines added and removed per month'
    >
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={t.y}
            y2={t.y}
            className='stroke-border'
            strokeWidth={t.v === 0 ? 1.5 : 1}
          />
          <text
            x={PAD.left - 8}
            y={t.y}
            dominantBaseline='middle'
            textAnchor='end'
            className='fill-date-lite text-[11px]'
          >
            {t.label}
          </text>
        </g>
      ))}
      <XYears months={series.map((p) => p.month)} x={x} />

      <path d={close(addLine)} fill={ADD_COLOR} fillOpacity={0.15} />
      <path d={close(delLine)} fill={DEL_COLOR} fillOpacity={0.15} />
      <path
        d={addLine}
        fill='none'
        stroke={ADD_COLOR}
        strokeWidth={1.75}
        strokeLinejoin='round'
      />
      <path
        d={delLine}
        fill='none'
        stroke={DEL_COLOR}
        strokeWidth={1.75}
        strokeLinejoin='round'
      />
      <Annotations months={series.map((p) => p.month)} x={x} />

      {hp && (
        <>
          <line
            x1={x(hover.idx!)}
            x2={x(hover.idx!)}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            className='stroke-date-lite'
            strokeWidth={1}
          />
          <circle cx={x(hover.idx!)} cy={up(hp.ins)} r={3} fill={ADD_COLOR} />
          <circle cx={x(hover.idx!)} cy={down(hp.del)} r={3} fill={DEL_COLOR} />
          <Tooltip
            px={x(hover.idx!)}
            lines={[
              { text: hp.month },
              { text: `+${hp.ins.toLocaleString()} added`, color: ADD_COLOR },
              { text: `−${hp.del.toLocaleString()} removed`, color: DEL_COLOR },
            ]}
          />
        </>
      )}

      <rect
        x={PAD.left}
        y={PAD.top}
        width={PLOT_W}
        height={PLOT_H}
        fill='transparent'
        pointerEvents='all'
        onMouseMove={hover.onMove}
        onMouseLeave={hover.clear}
      />
    </svg>
  )
}

const ChurnByRepo: React.FC<{ stack: Stack; champions: Champions }> = ({
  stack,
  champions,
}) => {
  const { months, repos, values, totals } = stack
  const n = months.length
  const maxTotal = Math.max(1, ...totals)
  const hover = useHoverIdx(n)

  const prefix = values.map((row) => {
    const acc: number[] = []
    let s = 0
    for (const v of row) {
      s += v
      acc.push(s)
    }
    return acc
  })
  const yMax = niceMax(Math.max(1, ...prefix.map((p) => p[p.length - 1])))
  const x = (i: number) => xAt(i, n)
  const y = (v: number) => PAD.top + PLOT_H - (v / yMax) * PLOT_H

  const colorFor = (repo: string) => champions.colors[repo] ?? BAND_COLOR
  const bandPath = (k: number) => {
    const top = months.map(
      (_, i) => `${x(i).toFixed(1)},${y(prefix[i][k]).toFixed(1)}`
    )
    const bottom = months
      .map(
        (_, i) =>
          `${x(i).toFixed(1)},${y(k === 0 ? 0 : prefix[i][k - 1]).toFixed(1)}`
      )
      .reverse()
    return `M${top.join(' L')} L${bottom.join(' L')} Z`
  }

  const yt = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(yMax * f))

  // Tooltip lines for the hovered month: total + top repos that month.
  let tip: { text: string; color?: string; muted?: boolean }[] = []
  if (hover.idx != null) {
    const i = hover.idx
    const row = repos
      .map((repo, k) => ({ repo, c: values[i][k], color: colorFor(repo) }))
      .filter((r) => r.c > 0)
      .sort((a, b) => b.c - a.c)
    const total = row.reduce((s, r) => s + r.c, 0)
    tip = [
      { text: months[i] },
      { text: `${total} commit${total === 1 ? '' : 's'}`, muted: true },
      ...row
        .slice(0, 8)
        .map((r) => ({ text: `${r.repo} (${r.c})`, color: r.color })),
    ]
    if (row.length > 8)
      tip.push({ text: `+${row.length - 8} more`, muted: true })
  }

  return (
    <svg
      ref={hover.ref}
      viewBox={`0 0 ${W} ${H}`}
      className='h-auto w-full'
      role='img'
      aria-label='Commits per month, stacked by repo'
    >
      <YGrid ticks={yt} y={y} />
      <XYears months={months} x={x} />
      {repos.map((repo, k) => (
        <path
          key={repo}
          d={bandPath(k)}
          fill={colorFor(repo)}
          fillOpacity={opacityFor(totals[k], maxTotal)}
          stroke={colorFor(repo)}
          strokeOpacity={0.25}
          strokeWidth={0.4}
        />
      ))}
      <Annotations months={months} x={x} />

      {hover.idx != null && (
        <>
          <line
            x1={x(hover.idx)}
            x2={x(hover.idx)}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            className='stroke-date'
            strokeWidth={1}
          />
          <Tooltip px={x(hover.idx)} lines={tip} />
        </>
      )}

      <rect
        x={PAD.left}
        y={PAD.top}
        width={PLOT_W}
        height={PLOT_H}
        fill='transparent'
        pointerEvents='all'
        onMouseMove={hover.onMove}
        onMouseLeave={hover.clear}
      />
    </svg>
  )
}

const repoUrl = (repo: string) =>
  `https://github.com/zsteinkamp/${repo.replace(/\.ORIG$/, '')}`

// Full repo legend (used in the expanded view): every band, its color, opacity
// and total, ordered like the stack.
const RepoLegend: React.FC<{ stack: Stack; champions: Champions }> = ({
  stack,
  champions,
}) => {
  const maxTotal = Math.max(1, ...stack.totals)
  return (
    <ul className='flex flex-wrap gap-x-5 gap-y-1 text-sm'>
      {stack.repos.map((repo, k) => {
        const color = champions.colors[repo] ?? BAND_COLOR
        return (
          <li key={repo} className='inline-flex items-center gap-1.5'>
            <span
              className='inline-block h-3 w-3 rounded-[2px]'
              style={{
                backgroundColor: color,
                opacity: opacityFor(stack.totals[k], maxTotal),
              }}
            />
            <a
              href={repoUrl(repo)}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              {repo}
            </a>
            <span className='text-date-lite'>({stack.totals[k]})</span>
          </li>
        )
      })}
    </ul>
  )
}

const ChampionCallout: React.FC<{ champions: Champions }> = ({ champions }) => (
  <div className='mt-4'>
    <h3 className='text-date'>Top repo each year</h3>
    <ul className='mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm'>
      {champions.byYear.map((c) => (
        <li key={c.year} className='inline-flex items-center gap-1.5'>
          <span
            className='inline-block h-3 w-3 rounded-[2px]'
            style={{ backgroundColor: champions.colors[c.repo] }}
          />
          <span className='text-date-lite'>{c.year}</span>
          <a
            href={repoUrl(c.repo)}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline'
          >
            {c.repo}
          </a>
          <span className='text-date-lite'>({c.commits})</span>
        </li>
      ))}
    </ul>
  </div>
)

// Fullscreen overlay: backdrop click or Esc closes; inner clicks don't.
const Modal: React.FC<{
  title: string
  onClose: () => void
  children: React.ReactNode
}> = ({ title, onClose, children }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div
      className='fixed inset-0 z-50 flex flex-col bg-pagebg p-4 md:p-8'
      onClick={onClose}
    >
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='m-0'>{title}</h2>
        <button
          onClick={onClose}
          aria-label='Close'
          className='rounded border border-border px-3 py-1 text-sm hover:bg-shadebg'
        >
          Close ✕
        </button>
      </div>
      <div
        className='flex-1 overflow-auto'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

const ChartFrame: React.FC<{
  onExpand: () => void
  children: React.ReactNode
}> = ({ onExpand, children }) => (
  <div
    className='cursor-zoom-in'
    onClick={onExpand}
    title='Click to expand to full screen'
  >
    {children}
  </div>
)

const DevPlot: React.FC<{
  series: MonthPoint[]
  stack: Stack
  champions: Champions
}> = ({ series, stack, champions }) => {
  const total = series.reduce((s, p) => s + p.commits, 0)
  const totalIns = series.reduce((s, p) => s + p.ins, 0)
  const totalDel = series.reduce((s, p) => s + p.del, 0)
  const [expanded, setExpanded] = useState<
    null | 'commits' | 'lines' | 'repos'
  >(null)

  return (
    <article>
      <Head>
        <title>Dev Plot — Zack Steinkamp</title>
        <meta
          name='description'
          content='Commits to my repos over time, graphed by month.'
        />
      </Head>
      <h1>Dev Plot</h1>
      <p>
        Commits across all my repos, summarized by month. Data comes from the
        same git history that powers the{' '}
        <a href='/devdiary' className='underline'>
          Dev Diary
        </a>
        . Hover for detail; click a chart to open it full screen.
      </p>

      <section className='mt-6'>
        <h2 className='mt-0'>Commits per month</h2>
        {series.length > 0 ? (
          <ChartFrame onExpand={() => setExpanded('commits')}>
            <CommitsByMonth series={series} />
          </ChartFrame>
        ) : (
          <p className='text-date-lite'>No data yet.</p>
        )}
        <p className='mt-2 text-sm text-date-lite'>
          {total.toLocaleString()} commits across {series.length} months.
        </p>
      </section>

      <section className='mt-8'>
        <h2 className='mt-0'>Lines changed per month</h2>
        <p className='text-sm text-date-lite'>
          Lines added rise above the center line; lines removed drop below it —
          same month axis as above.
        </p>
        {series.length > 0 ? (
          <ChartFrame onExpand={() => setExpanded('lines')}>
            <LinesPerMonth series={series} />
          </ChartFrame>
        ) : (
          <p className='text-date-lite'>No data yet.</p>
        )}
        <p className='mt-2 text-sm text-date-lite'>
          <span className='text-emerald-600 dark:text-emerald-400'>
            +{totalIns.toLocaleString()}
          </span>{' '}
          /{' '}
          <span className='text-red-500 dark:text-red-400'>
            −{totalDel.toLocaleString()}
          </span>{' '}
          lines all time.
        </p>
      </section>

      <section className='mt-8'>
        <h2 className='mt-0'>By repo</h2>
        <p className='text-sm text-date-lite'>
          Monthly commits stacked by repo ({stack.repos.length} repos), ordered
          by total commits. Each band&apos;s opacity scales with that
          repo&apos;s all-time commits — the busiest projects are the most
          opaque. The repo that topped each year gets its own color (below).
        </p>
        {stack.months.length > 0 ? (
          <ChartFrame onExpand={() => setExpanded('repos')}>
            <ChurnByRepo stack={stack} champions={champions} />
          </ChartFrame>
        ) : (
          <p className='text-date-lite'>No data yet.</p>
        )}
        <ChampionCallout champions={champions} />
      </section>

      {expanded === 'commits' && (
        <Modal title='Commits per month' onClose={() => setExpanded(null)}>
          <CommitsByMonth series={series} />
          <p className='mt-2 text-sm text-date-lite'>
            {total.toLocaleString()} commits across {series.length} months.
          </p>
        </Modal>
      )}
      {expanded === 'lines' && (
        <Modal
          title='Lines changed per month'
          onClose={() => setExpanded(null)}
        >
          <LinesPerMonth series={series} />
          <p className='mt-2 text-sm text-date-lite'>
            <span className='text-emerald-600 dark:text-emerald-400'>
              +{totalIns.toLocaleString()}
            </span>{' '}
            /{' '}
            <span className='text-red-500 dark:text-red-400'>
              −{totalDel.toLocaleString()}
            </span>{' '}
            lines all time.
          </p>
        </Modal>
      )}
      {expanded === 'repos' && (
        <Modal title='Commits by repo' onClose={() => setExpanded(null)}>
          <ChurnByRepo stack={stack} champions={champions} />
          <div className='mt-4'>
            <h3 className='text-date'>All repos</h3>
            <RepoLegend stack={stack} champions={champions} />
          </div>
          <ChampionCallout champions={champions} />
        </Modal>
      )}
    </article>
  )
}

export default DevPlot
