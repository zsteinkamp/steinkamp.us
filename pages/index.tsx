import getPosts from '@/util/getPosts'
import PostIndex from '@/components/PostIndex'
import generateRssFeed from '@/util/GenerateRssFeed'

export const getStaticProps = async () => {
  const posts = await getPosts('posts')

  // Void function that writes out rss.xml in the public/ directory.
  // Calling here as a convenient spot that is run once at build time.
  generateRssFeed(posts)

  return {
    props: {
      posts: posts,
    },
  }
}

interface IndexProps {
  posts: Array<Record<string, string>>
}

const Index: React.FC<IndexProps> = ({ posts }) => {
  return (
    <>
      <PostIndex className='max-w-2xl md:mt-[-0.8rem] md:mr-8' posts={posts} />
    </>
  )
}
export default Index
