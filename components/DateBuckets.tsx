import { DateBucketType } from "@/util/getDateBuckets"
import dayjs, { OpUnitType } from "dayjs"

type DateBucketsProps = {
  dateBuckets: DateBucketType
  className?: string
}
const DateBuckets: React.FC<DateBucketsProps> = ({ dateBuckets, className = "" }) => {
  if (dateBuckets.granularity === undefined) {
    return (<div className={className}>Error</div>)
  }

  function granularityToFormat(granularity: OpUnitType) {
    if (granularity === 'year') {
      return 'YYYY'
    }
    if (granularity === 'month') {
      return "YYYY MMM"
    }
    if (granularity === 'week') {
      return "YYYY-mm-dd"
    }
    if (granularity === 'day') {
      return "YYYY-mm-dd"
    }
  }

  const bucketKeys = Object.keys(dateBuckets.buckets)
  bucketKeys.sort()
  const bucketDivs = bucketKeys.map((key) => {
    const bucketVal = dateBuckets.buckets[key]
    const bucketPct = Math.round((bucketVal / dateBuckets.maxVal) * 100) + "%"
    return (
      <div key={key} className="relative bg-pagebg-light dark:bg-pagebg-dark group h-12 font-sans text-xs uppercase font-normal text-center hover:bg-shadebg-light hover:dark:bg-shadebg-dark">
        <div className={`absolute bg-link-base-light group-hover:bg-link-hover-light left-0 w-full bottom-0`} style={{ height: bucketPct }} />
        <div className="absolute w-full hidden group-hover:block top-[-1rem] ">
          {bucketVal}
        </div>
        <div className="absolute w-full bottom-[-1rem] hidden group-hover:block">
          {dateBuckets.granularity && dayjs(parseInt(key)).utc().format(granularityToFormat(dateBuckets.granularity))}
        </div>
      </div>
    )
  })

  return (<div className="grid grid-flow-col">{bucketDivs}</div>)
}

export default DateBuckets