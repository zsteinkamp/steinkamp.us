import { DateBucketType } from "@/util/getDateBuckets"
import DateBuckets from '@/components/DateBuckets'
import dayjs from 'dayjs'
import { ChangeEvent, useEffect, useState } from 'react'
import ReactSlider from "react-slider"

const SSK_MIN_DATE = 'minDate'
const SSK_MAX_DATE = 'maxDate'
const SSK_FILTER = 'filter'
const SSK_TAG_ARR = 'tagArr'

const hasSessionStorage = () => {
  return !!(typeof window !== 'undefined' && window.sessionStorage)
}

interface PostFilterProps {
  posts: Record<string, string>[]
  buckets: DateBucketType
  filteredPosts: Record<string, string>[]
  setFilteredPosts: (arg0: Record<string, string>[]) => void
}

const PostFilter: React.FC<PostFilterProps> = ({ posts, buckets, filteredPosts, setFilteredPosts }) => {
  const [minSlider, setMinSlider] = useState(buckets.minDate)
  const [maxSlider, setMaxSlider] = useState(buckets.maxDate)
  const [filter, setFilter] = useState('')
  const [tagArr, setTagArr] = useState([] as string[])

  const updateMinSlider = (val: number) => {
    hasSessionStorage() &&
      window.sessionStorage.setItem(SSK_MIN_DATE, val.toString())
    setMinSlider(val)
  }
  const updateMaxSlider = (val: number) => {
    hasSessionStorage() &&
      window.sessionStorage.setItem(SSK_MAX_DATE, val.toString())
    setMaxSlider(val)
  }
  const updateFilterVal = (filterVal: string) => {
    hasSessionStorage() && window.sessionStorage.setItem(SSK_FILTER, filterVal)
    setFilter(filterVal)
  }
  const updateTagArr = (tagArr: string[]) => {
    hasSessionStorage() && window.sessionStorage.setItem(SSK_TAG_ARR, JSON.stringify(tagArr))
    setTagArr(tagArr)
  }

  useEffect(() => {
    if (hasSessionStorage()) {
      updateMinSlider(
        parseInt(window.sessionStorage.getItem(SSK_MIN_DATE) || '0') ||
        buckets.minDate
      )
      updateMaxSlider(
        parseInt(window.sessionStorage.getItem(SSK_MAX_DATE) || '0') ||
        buckets.maxDate
      )
      updateFilterVal(window.sessionStorage.getItem(SSK_FILTER) || '')
      updateTagArr(JSON.parse(window.sessionStorage.getItem(SSK_TAG_ARR) || '[]'))
    }
  }, [])

  const handleSliderChange = (e: number[]) => {
    if (undefined === buckets.granularity) {
      return
    }
    const minSliderVal = dayjs(e[0])
      .utc()
      .startOf(buckets.granularity)
      .valueOf()
    const maxSliderVal = dayjs(e[1]).utc().endOf(buckets.granularity).valueOf()
    updateMinSlider(minSliderVal)
    updateMaxSlider(maxSliderVal)
    //console.log("SLIDER CHANGE", { e })
  }

  useEffect(() => {
    const tempPosts = []
    if (undefined === buckets.granularity) {
      return
    }
    for (const post of posts) {
      const postDate = dayjs(post.date)
        .utc()
        .startOf(buckets.granularity)
        .valueOf()
      //console.log("IN HERE", { minSlider, maxSlider, postDate, goodMin: postDate >= minSlider, goodMax: postDate <= maxSlider })
      if (postDate >= minSlider && postDate <= maxSlider) {
        if (
          filter === '' ||
          JSON.stringify(post).toLowerCase().indexOf(filter.toLowerCase()) > -1
        ) {
          tempPosts.push(post)
        }
      }
    }
    setFilteredPosts(tempPosts)
  }, [minSlider, maxSlider, filter])

  const onBucketClick = (ts: number) => {
    if (!buckets.granularity) {
      return
    }
    const maxdjs = dayjs(ts).utc().endOf(buckets.granularity)
    const maxval = maxdjs.valueOf()
    updateMinSlider(ts)
    updateMaxSlider(maxval)
  }

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filterVal = e.target.value
    updateFilterVal(filterVal)
  }

  const onTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tagArr = e.target.value.split(',')
    updateTagArr(tagArr)
  }

  return (
    <div className='sticky top-0 bg-pagebg pt-[0.9rem]'>
      <div className='grid grid-cols-2'>
        <div>
          <h4 className='text-text'>Showing {filteredPosts.length} posts</h4>
        </div>
        <div className='text-right'>
          <input
            placeholder='Filter...'
            type='text'
            value={filter}
            onChange={onFilterChange}
            className='rounded px-1 text-xs'
          />
        </div>
      </div>
      <DateBuckets dateBuckets={buckets} onBucketClick={onBucketClick} />
      <div className='pb-10'>
        <ReactSlider
          onChange={(e) => handleSliderChange(e)}
          className='mt-[-1rem]'
          thumbClassName='
              text-xs font-bold w-10 rounded text-center mt-1 pt-1
              pb-1 bg-link-base text-thumb-text hover:bg-link-hover cursor-pointer
              '
          trackClassName='h-4 mt-4 ml-2 mr-2'
          min={buckets.minDate}
          max={buckets.maxDate}
          value={[Number(minSlider), Number(maxSlider)]}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={(state) =>
            `Thumb value ${dayjs(state.valueNow).utc().format('YYYY')}`
          }
          renderThumb={(props, state) => (
            <div {...props}>{dayjs(state.valueNow).utc().format('YYYY')}</div>
          )}
          pearling
          minDistance={10}
          withTracks
        />
      </div>
    </div>
  )
}

export default PostFilter