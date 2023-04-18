import getPosts from '@/util/getPosts'
import getDirMeta from '@/util/getDirMeta'
import Link from "next/link";
import path from 'path'
import PostIndex from '@/components/PostIndex'
import BackButton from '@/components/BackButton'

export const getStaticProps = async () => {
  const posts = await getPosts({ indexPath: 'pop/studeute', newestFirst: false });
  const dirmeta = await getDirMeta(path.join(process.cwd(), 'pages/pop/studeute'));

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
      <BackButton className='link float-right' />
      <h1>{ dirmeta && dirmeta.title || 'OOPS' }</h1>
      <p>{ dirmeta && dirmeta.excerpt || 'oopsiedoozie' }</p>
      <PostIndex posts={ posts } />
      <BackButton className='link float-right' />
    </>
  );
};
export default Posts;
