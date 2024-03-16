//import ReactSlider from 'react-slider'
import ReactSlider from 'react-slider'
import getPosts from '@/util/getPosts'
import PostIndex from '@/components/PostIndex'
import generateRssFeed from '@/util/GenerateRssFeed'
import getDateBuckets, { DateBucketType } from '@/util/getDateBuckets'
import DateBuckets from '@/components/DateBuckets'
import dayjs from 'dayjs'
import { ChangeEvent, useEffect, useState } from 'react'

export const getStaticProps = async () => {
  const posts = await getPosts('posts')
  const buckets = getDateBuckets(posts, 20)

  // Void function that writes out rss.xml in the public/ directory.
  // Calling here as a convenient spot that is run once at build time.
  generateRssFeed(posts)

  return {
    props: {
      posts,
      buckets,
    },
  }
}

interface IndexProps {
  posts: Array<Record<string, string>>
  buckets: DateBucketType
}

const SSK_MIN_DATE = 'minDate'
const SSK_MAX_DATE = 'maxDate'
const SSK_FILTER = 'filter'

const hasSessionStorage = () => {
  return !!(typeof window !== 'undefined' && window.sessionStorage)
}

const Index: React.FC<IndexProps> = ({ posts, buckets }) => {
  const [minSlider, setMinSlider] = useState(buckets.minDate)
  const [maxSlider, setMaxSlider] = useState(buckets.maxDate)
  const [filter, setFilter] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(posts)

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
          post.title.toLowerCase().indexOf(filter) > -1 ||
          post.excerpt.toLowerCase().indexOf(filter) > -1
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

  return (
    <>
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
      <PostIndex className='max-w-2xl md:mt-6' posts={filteredPosts} />
    </>
  )
}
export default Index
