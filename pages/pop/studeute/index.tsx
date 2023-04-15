import getPosts from '@/util/getPosts'
import getDirMeta from '@/util/getDirMeta'
import Link from "next/link";
import path from 'path'
import PostIndex from '@/components/PostIndex'

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
      <Link href='/pop' className='block text-right'>&lt;&lt;&lt; Back</Link>
      <h1>{ dirmeta && dirmeta.title || 'OOPS' }</h1>
      <p>{ dirmeta && dirmeta.excerpt || 'oopsiedoozie' }</p>
      <PostIndex posts={ posts } />
      <Link href='/pop' className='block text-right'>&lt;&lt;&lt; Back</Link>
    </>
  );
};
export default Posts;
