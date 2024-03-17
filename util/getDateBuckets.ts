import { PostsListType } from './getPosts'
import dayjs, { ManipulateType, OpUnitType } from 'dayjs'

export type TagArrType = string[]

export type DateBucketType = {
  maxVal: number
  minDate: number
  maxDate: number
  granularity: OpUnitType
  buckets: Record<string, number>
  tags: TagArrType
}

export default function getDateBuckets(
  posts: PostsListType,
  targetNumBuckets: number
): DateBucketType {
  const ret: DateBucketType = {
    maxVal: 0,
    minDate: Infinity,
    maxDate: -Infinity,
    granularity: 'year',
    buckets: {},
    tags: [],
  }
  // get min/max
  let minDate = null as dayjs.Dayjs | null
  let maxDate = null as dayjs.Dayjs | null
  const tagsObj = {} as Record<string, boolean>

  posts.forEach((post) => {
    if (post.tags) {
      for (const tag of post.tags) {
        tagsObj[tag] = true
      }
    }
    const postDate = dayjs(post.date).utc()
    if (null === minDate || postDate < minDate) {
      minDate = postDate
    }
    if (null === maxDate || postDate > maxDate) {
      maxDate = postDate
    }
  })

  if (minDate === null || maxDate === null) {
    console.warn('No dates in posts.')
    return ret
  }

  const dateRange = maxDate.diff(minDate)
  const desiredBucketSize = dateRange / targetNumBuckets

  // map a duration name to milliseconds
  const granularityDurations: [number, OpUnitType][] = [
    [86400000, 'day'],
    [86400000 * 7, 'week'],
    [86400000 * 30, 'month'],
    [86400000 * 365, 'year'],
  ]

  for (const [granDur, granStr] of granularityDurations) {
    if (desiredBucketSize < granDur) {
      // found the granularity
      ret.granularity = granStr
      break
    }
  }

  if (ret.granularity === undefined) {
    return ret
  }

  // round off start/end to bounds of the time period
  minDate = minDate.startOf(ret.granularity)
  maxDate = maxDate.endOf(ret.granularity)

  // initialize buckets
  let currStep = dayjs(minDate).utc()
  while (currStep <= maxDate) {
    ret.buckets[currStep.valueOf().toString()] = 0
    currStep = currStep.add(1, ret.granularity as ManipulateType)
    //console.log({ currStep: currStep.valueOf() })
  }

  for (const post of posts) {
    if (!post.date) {
      continue
    }
    const bucket = dayjs(post.date)
      .utc()
      .startOf(ret.granularity)
      .valueOf()
      .toString()
    //console.log({ title: post.title, date: post.date, bucket: dayjs(bucket).format('YYYY MMM') })
    ret.buckets[bucket]++
    if (ret.buckets[bucket] > ret.maxVal) {
      ret.maxVal = ret.buckets[bucket]
    }
  }

  ret.minDate = minDate.valueOf()
  ret.maxDate = maxDate.valueOf()
  ret.tags = Object.keys(tagsObj)
  ret.tags.sort()

  //console.log({ ret })

  return ret
}
