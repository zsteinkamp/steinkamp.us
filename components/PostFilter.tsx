import { DateBucketType } from "@/util/getDateBuckets"
import DateBuckets from '@/components/DateBuckets'
import dayjs from 'dayjs'
import { ChangeEvent, useEffect, useState } from 'react'
import ReactSlider from "react-slider"

const SSK_MIN_DATE = 'minDate'
const SSK_MAX_DATE = 'maxDate'
const SSK_FILTER = 'filter'
const SSK_SEL_TAGS = 'selTags'

const hasSessionStorage = () => {
  return !!(typeof window !== 'undefined' && window.sessionStorage)
}

interface PostFilterProps {
  posts: Record<string, string>[]
  buckets: DateBucketType
  filteredPosts: Record<string, string>[]
  setFilteredPosts: (arg0: Record<string, string>[]) => void
}

type selTagsType = Record<string, boolean>

const PostFilter: React.FC<PostFilterProps> = ({ posts, buckets, filteredPosts, setFilteredPosts }) => {
  const [minSlider, setMinSlider] = useState(buckets.minDate)
  const [maxSlider, setMaxSlider] = useState(buckets.maxDate)
  const [filter, setFilter] = useState('')
  const [selTags, setSelTags] = useState({} as Record<string, boolean>)

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
  const updateSelTags = (selTags: selTagsType) => {
    //console.log({ selTags })
    hasSessionStorage() && window.sessionStorage.setItem(SSK_SEL_TAGS, JSON.stringify(selTags))
    setSelTags(selTags)
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
      updateSelTags(JSON.parse(window.sessionStorage.getItem(SSK_SEL_TAGS) || '{}'))
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
          const selTagKeys = Object.keys(selTags)
          let addRecord = selTagKeys.length === 0 // default to false if any tags are selected, true if no tags are selected
          //console.log('HERE NOFO', { addRecord, selTagKeys, tags: post.tags })
          if (selTagKeys.length > 0 && post.tags && post.tags.length > 0) {
            for (const selTagKey of selTagKeys) {
              if (post.tags.indexOf(selTagKey) > -1) {
                addRecord = true
                break
              }
            }
          }
          if (addRecord) {
            tempPosts.push(post)
          }
        }
      }
    }
    setFilteredPosts(tempPosts)
  }, [minSlider, maxSlider, filter, selTags])

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

  const handleTagToggle = (tag: string, e: ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked
    //console.log({ tag, value: e.target.checked })
    const newTags = { ...selTags }
    if (isEnabled) {
      newTags[tag] = true
    } else {
      //console.log('WANNA DELETE', JSON.stringify(newTags))
      delete (newTags[tag])
      //console.log('AFTER DELETE', JSON.stringify(newTags))
    }
    //console.log({ newTags })
    updateSelTags(newTags)
  }

  return (
    <div className='sticky top-0 bg-pagebg pt-[0.9rem]'>
      <div className='grid grid-cols-2'>
        <div>
          <h4 className='text-text'>Showing {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"}</h4>
        </div>
        <div className='text-right'>
          <input
            placeholder='Filter...'
            type='text'
            value={filter}
            onChange={(e) => onFilterChange(e)}
            className='rounded px-1 text-xs'
          />
        </div>
      </div>
      <DateBuckets dateBuckets={buckets} onBucketClick={onBucketClick} />
      <div className='pb-9'>
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
      <div className="flex flex-wrap justify-center">
        {buckets.tags.map((tag) => {
          return (
            <div key={tag} className="mb-1">
              <label className={`${selTags[tag] ? "bg-link-base border-link-hover text-pagebg" : "bg-shadebg border-shadeshadow"} cursor-pointer py-1 px-2 border-1 rounded mr-1 text-xs hover:bg-link-hover`}>
                {tag}
                <input type="checkbox"
                  className="hidden"
                  checked={!!selTags[tag]}
                  onChange={(e) => handleTagToggle(tag, e)}
                />
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostFilter