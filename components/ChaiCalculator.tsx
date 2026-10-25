import { useState } from 'react'

interface ChaiCalculatorProps {
  className?: string
}

const ML_PER_OZ = 29.5735
const BOIL_OFF_OZ = 3

// Per-portion amounts in teaspoons
const SPICES: [string, number][] = [
  ['Black tea', 1],
  ['Sugar', 1],
  ['Dried grated ginger', 1],
  ['Coarse cinnamon', 1 / 4],
  ['Cardamom seeds', 1 / 8],
  ['Coarse ground black pepper', 1 / 8],
]

const FRACTIONS: Record<number, string> = {
  1: '1/8',
  2: '1/4',
  3: '3/8',
  4: '1/2',
  5: '5/8',
  6: '3/4',
  7: '7/8',
}

// Formats a teaspoon amount as a mixed fraction, rounded to the nearest 1/8
const formatTsp = (tsp: number) => {
  const eighths = Math.round(tsp * 8)
  const whole = Math.floor(eighths / 8)
  const frac = FRACTIONS[eighths % 8]
  const amount = [whole || null, frac].filter(Boolean).join(' ')
  const tbsp = tsp >= 3 ? ` (${+(tsp / 3).toFixed(2)} tbsp)` : ''
  return `${amount} tsp${tbsp}`
}

const ChaiCalculator: React.FC<ChaiCalculatorProps> = ({ className }) => {
  const [portions, setPortions] = useState(1)
  const [metric, setMetric] = useState(false)
  const [potWeight, setPotWeight] = useState('')

  const fmtVol = (oz: number) =>
    metric ? `${Math.round(oz * ML_PER_OZ)} mL` : `${+oz.toFixed(1)} oz`
  const fmtWeight = (oz: number) =>
    metric ? `${Math.round(oz * 28.3495)} g` : `${+oz.toFixed(1)} oz`

  const waterOz = BOIL_OFF_OZ + 3 * portions
  const milkOz = 8 * portions
  const yieldOz = 11 * portions

  // Pot weight is entered in the selected unit; convert to oz for the math
  const potRaw = parseFloat(potWeight)
  const potOz = isNaN(potRaw) ? null : metric ? potRaw / 28.3495 : potRaw
  const startOz = potOz === null ? null : potOz + waterOz + milkOz
  const doneOz = startOz === null ? null : startOz - BOIL_OFF_OZ

  const setClamped = (n: number) => setPortions(Math.min(12, Math.max(1, n)))

  const btn =
    'rounded border border-border bg-shadebg px-3 py-1 text-header hover:bg-shadeshadow disabled:opacity-40'

  return (
    <div
      className={`my-6 rounded-lg border border-border p-4 ${className || ''}`}
    >
      <div className='mb-4 flex flex-wrap items-center gap-4'>
        <div className='flex items-center gap-2'>
          <span className='font-bold text-header'>Portions</span>
          <button
            className={btn}
            onClick={() => setClamped(portions - 1)}
            disabled={portions <= 1}
            aria-label='Fewer portions'
          >
            −
          </button>
          <span className='w-6 text-center text-lg font-bold text-header'>
            {portions}
          </span>
          <button
            className={btn}
            onClick={() => setClamped(portions + 1)}
            disabled={portions >= 12}
            aria-label='More portions'
          >
            +
          </button>
        </div>
        <label className='flex cursor-pointer items-center gap-2'>
          <input
            type='checkbox'
            checked={metric}
            onChange={(e) => {
              setMetric(e.target.checked)
              setPotWeight('')
            }}
          />
          Metric
        </label>
      </div>

      <table className='w-full text-left'>
        <tbody>
          <tr>
            <td className='py-0.5 pr-4'>Water</td>
            <td className='font-bold text-header'>{fmtVol(waterOz)}</td>
          </tr>
          <tr>
            <td className='py-0.5 pr-4'>Milk / oatmilk</td>
            <td className='font-bold text-header'>{fmtVol(milkOz)}</td>
          </tr>
          {SPICES.map(([name, tsp]) => (
            <tr key={name}>
              <td className='py-0.5 pr-4'>{name}</td>
              <td className='font-bold text-header'>
                {formatTsp(tsp * portions)}
              </td>
            </tr>
          ))}
          <tr>
            <td className='py-0.5 pr-4'>Whole cloves</td>
            <td className='font-bold text-header'>
              {3 * portions}–{5 * portions}
            </td>
          </tr>
        </tbody>
      </table>

      <div className='mt-4 border-t border-border pt-4'>
        <label className='flex flex-wrap items-center gap-2'>
          Empty pot weight ({metric ? 'g' : 'oz'}):
          <input
            type='number'
            inputMode='decimal'
            min='0'
            value={potWeight}
            onChange={(e) => setPotWeight(e.target.value)}
            className='w-24 rounded border border-border bg-pagebg px-2 py-1 text-header'
          />
        </label>
        {startOz !== null && doneOz !== null ? (
          <p className='mt-2'>
            Starts at <strong>{fmtWeight(startOz)}</strong>. It&apos;s done when
            the scale reads <strong>{fmtWeight(doneOz)}</strong>.
          </p>
        ) : (
          <p className='mt-2'>
            Boil off {fmtVol(BOIL_OFF_OZ)} of water. Enter your pot&apos;s
            weight to get a target scale reading.
          </p>
        )}
        <p className='mt-1'>
          Makes about <strong>{fmtVol(yieldOz)}</strong> of chai.
        </p>
      </div>
    </div>
  )
}

export { ChaiCalculator }
