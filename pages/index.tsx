import getPosts from '@/util/getPosts'
import PostIndex from '@/components/PostIndex'

export const getStaticProps = async () => {
  const posts = await getPosts({ indexPath: 'posts' });
  return {
    props: {
      posts: posts,
    },
  };
};

const Index = ({ posts }) => {
  return (
    <PostIndex posts={posts} />
  );
};
export default Index;
