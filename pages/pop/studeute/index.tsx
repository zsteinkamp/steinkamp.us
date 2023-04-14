import fs from "fs";
import path from "path";
import glob from "glob-promise";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/layouts/SiteLayout";
import { stripHtml } from "string-strip-html";
import dayjs from 'dayjs';

export const getStaticProps = async () => {
  // Find all Markdown files in the /posts directory
  const POSTS_DIR = path.join(process.cwd(), "pages/pop/studeute");
  const postsPath = (await glob("**/*.md", { cwd: POSTS_DIR }))

  // sort descending date
  postsPath.sort((a,b) => { return b < a ? -1 : 1; });

  const posts = postsPath.map((postPath) => {
    // get the slug from the markdown file name
    const slug = path.basename(postPath, path.extname(postPath));
    // read the markdown files
    const source = fs.readFileSync(
      path.join(process.cwd(), "pages/pop/studeute", postPath),
      "utf8"
    );
    // use gray-matter to parse the post frontmatter section
    const { content, data } = matter(source);

    const excerpt = stripHtml(content).result.substr(0, 512);

    return {
      title: data.title,
      excerpt: excerpt,
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
      <h1>Stude Ute</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.slug} className="">
            <Link className="p-8 block rounded-lg mt-0 bg-transparent hover:bg-stone-200 dark:hover:bg-stone-800" href={`/pop/studeute/${post.slug}`}>
              <div className="text-stone-400 dark:text-stone-500 text-sm">{post.slug.substr(0, 10)}</div>
              <h2 className="font-condensed text-2xl mb-2 mt-2">{post.title}</h2>
              <div className="text-stone-600 dark:text-stone-400 line-clamp-3">{post.excerpt}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Posts;
