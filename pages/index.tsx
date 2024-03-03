import getPosts from '@/util/getPosts'
import PostIndex from '@/components/PostIndex'

export const getStaticProps = async () => {
  const posts = await getPosts('posts')
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
  return <PostIndex className="mt-[2.2rem] mr-8 max-w-2xl" posts={posts} />
}
export default Index
