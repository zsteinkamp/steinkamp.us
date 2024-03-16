//import ReactSlider from 'react-slider'
import getPosts from '@/util/getPosts'
import PostIndex from '@/components/PostIndex'
import PostFilter from '@/components/PostFilter'
import generateRssFeed from '@/util/GenerateRssFeed'
import getDateBuckets, { DateBucketType } from '@/util/getDateBuckets'
import { useState } from 'react'

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
  const [filteredPosts, setFilteredPosts] = useState(posts)
  return (
    <>
      <PostFilter posts={posts} buckets={buckets} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />
      <PostIndex className='max-w-2xl md:mt-4' posts={filteredPosts} />
    </>
  )
}
export default Index
