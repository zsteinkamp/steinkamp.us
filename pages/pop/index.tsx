import getPosts from '@/util/getPosts'
import getDirMeta from '@/util/getDirMeta'
import path from 'path'
import PostIndex from '@/components/PostIndex'

export const getStaticProps = async () => {
  const posts = await getPosts({ indexPath: 'pop', newestFirst: false });
  const dirmeta = await getDirMeta(path.join(process.cwd(), 'pages/pop'));

  return {
    props: {
      posts: posts,
      dirmeta,
    },
  };
};

const Posts = ({ posts, dirmeta }) => {
  return (
    <>
      <h1>{ dirmeta && dirmeta.title || 'OOPS' }</h1>
      <p>{ dirmeta && dirmeta.excerpt || 'oopsiedoozie' }</p>
      <PostIndex posts={ posts } />
    </>
  );
};
export default Posts;
