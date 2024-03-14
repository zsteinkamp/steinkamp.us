//import ReactSlider from 'react-slider'
import ReactSlider from 'react-slider'
import getPosts from '@/util/getPosts'
import PostIndex from '@/components/PostIndex'
import generateRssFeed from '@/util/GenerateRssFeed'
import getDateBuckets, { DateBucketType } from '@/util/getDateBuckets'
import DateBuckets from '@/components/DateBuckets'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

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

const Index: React.FC<IndexProps> = ({ posts, buckets }) => {
  const [minSlider, setMinSlider] = useState(buckets.minDate)
  const [maxSlider, setMaxSlider] = useState(buckets.maxDate)
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const handleSliderChange = (e: number[]) => {
    if (undefined === buckets.granularity) {
      return
    }
    setMinSlider(dayjs(e[0]).utc().startOf(buckets.granularity).valueOf())
    setMaxSlider(dayjs(e[1]).utc().startOf(buckets.granularity).valueOf())
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
        tempPosts.push(post)
      }
    }
    setFilteredPosts(tempPosts)
  }, [minSlider, maxSlider])

  return (
    <>
      <DateBuckets dateBuckets={buckets} />
      <div className='mb-8'>
        <ReactSlider
          onChange={(e) => handleSliderChange(e)}
          className='mt-[-1rem]'
          thumbClassName='text-xs font-bold w-10 text-center mt-1 pt-1 pb-1 text-white bg-red-600 cursor-pointer'
          trackClassName='h-4 mt-4 ml-2 mr-2'
          min={buckets.minDate}
          max={buckets.maxDate}
          defaultValue={[buckets.minDate, buckets.maxDate]}
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
      <h4 className='text-text-light dark:text-text-dark'>
        Showing {filteredPosts.length} posts...
      </h4>
      <PostIndex className='max-w-2xl md:mt-8' posts={filteredPosts} />
    </>
  )
}
export default Index

/*
 */
