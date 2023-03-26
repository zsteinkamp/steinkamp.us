import fs from "fs";
import path from "path";
import glob from "glob-promise";
import matter from "gray-matter";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/layouts/SiteLayout";

export const getStaticProps = async () => {
  // Find all Markdown files in the /posts directory
  const POSTS_DIR = path.join(process.cwd(), "pages/posts");
  const postsPath = (await glob("**/*.md", { cwd: POSTS_DIR }))
  
  // sort descending date
  postsPath.sort((a,b) => { console.log({ a, b }); return b < a ? -1 : 1; });

  const posts = postsPath.map((postPath) => {
    // get the slug from the markdown file name
    const slug = path.basename(postPath, path.extname(postPath));
    // read the markdown files
    const source = fs.readFileSync(
      path.join(process.cwd(), "pages/posts", postPath),
      "utf8"
    );
    // use gray-matter to parse the post frontmatter section
    const { data } = matter(source);

    let cover = null;

    if (data && data.entry && data.entry.data && data.entry.data.thumb_url) {
      cover = data.entry.data.thumb_url;
    }
    if (data.entry.source === 'youtube') {
      cover = 'https://i.ytimg.com/vi/' + data.entry.data.id + '/default.jpg';
    }

    return {
      title: data.title,
      description: data.description || "",
      cover,
      slug
    };
  });

  return {
    props: {
      posts,
    },
  };
};

const Posts = ({ posts }) => {
  return (
    <>
      <Head>
        <title>My posts</title>
        <meta name="description" content="View all my posts" />
      </Head>
      <section>
        <header className="posts-header">
          <div className="wrapper">
            <h1 className="font-extrabold text-5xl">
              Hey there, view all my posts
            </h1>
          </div>
        </header>
        <ul className="posts">
          {posts.map((post) => (
            <li key={post.slug} className="post">
              <Link href={`/posts/${post.slug}`}>
                <header className="post-item-header">
                  {post.cover &&
                    <Image
                      src={post.cover}
                      width={300}
                      height={200}
                      alt="cover"
                    />
                  }
                  <div className="details">
                    <h2 className="font-bold text-3xl">{post.title}</h2>
                    <p> {post.description} </p>
                  </div>
                </header>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
export default Posts;

// define layout for posts page
Posts.getLayout = (page) => {
  return <SiteLayout> {page} </SiteLayout>;
};
