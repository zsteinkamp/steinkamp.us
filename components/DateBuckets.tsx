import { DateBucketType } from '@/util/getDateBuckets'
import dayjs, { OpUnitType } from 'dayjs'

type DateBucketsProps = {
  dateBuckets: DateBucketType
  className?: string
}
const DateBuckets: React.FC<DateBucketsProps> = ({
  dateBuckets,
  className = '',
}) => {
  if (dateBuckets.granularity === undefined) {
    return <div className={className}>Error</div>
  }

  function granularityToFormat(granularity: OpUnitType) {
    if (granularity === 'year') {
      return 'YYYY'
    }
    if (granularity === 'month') {
      return 'YYYY MMM'
    }
    if (granularity === 'week') {
      return 'YYYY-mm-dd'
    }
    if (granularity === 'day') {
      return 'YYYY-mm-dd'
    }
  }

  const bucketKeys = Object.keys(dateBuckets.buckets)
  bucketKeys.sort()
  const bucketDivs = bucketKeys.map((key) => {
    const bucketVal = dateBuckets.buckets[key]
    const bucketPct = Math.round((bucketVal / dateBuckets.maxVal) * 100) + '%'
    return (
      <div
        key={key}
        className='group relative h-12 bg-pagebg-light dark:bg-pagebg-dark text-center font-sans text-xs font-normal uppercase'
      >
        <div
          className={`absolute left-0 bottom-0 w-full bg-shadeshadow-light dark:bg-shadebg-dark group-hover:bg-shadeshadow-light dark:group-hover:bg-shadebg-dark`}
          style={{ height: bucketPct }}
        />
        <div className='absolute top-[-1rem] hidden w-full group-hover:block '>
          {bucketVal}
        </div>
        <div className='absolute bottom-[-1rem] hidden w-full group-hover:block'>
          {dateBuckets.granularity &&
            dayjs(parseInt(key))
              .utc()
              .format(granularityToFormat(dateBuckets.granularity))}
        </div>
      </div>
    )
  })

  return <div className='grid grid-flow-col gap-1'>{bucketDivs}</div>
}

export default DateBuckets
