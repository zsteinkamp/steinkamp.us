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
  posts: Array<any>
}

const Index: React.FC<IndexProps> = ({ posts }) => {
  return <PostIndex posts={posts} />
}
export default Index
