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
  const POSTS_DIR = path.join(process.cwd(), "pages/pop/");
  const postsPath = (await glob("*.md", { cwd: POSTS_DIR }))

  const posts = postsPath.map((postPath) => {
    // get the slug from the markdown file name
    const slug = path.basename(postPath, path.extname(postPath));
    // read the markdown files
    const source = fs.readFileSync(
      path.join(process.cwd(), "pages/pop", postPath),
      "utf8"
    );
    // use gray-matter to parse the post frontmatter section
    const { content, data } = matter(source);

    const excerpt = stripHtml(content).result.substr(0, 512);

    return {
      title: data.title,
      date: data.date.toISOString(),
      thumbnail: data.thumbnail,
      excerpt: excerpt,
      slug
    };
  });

  posts.push({
    title: 'Stude Ute',
    date: '2007-11-27',
    thumbnail: '/images/pop/studeute/floor005-1.jpg',
    excerpt: 'Perhaps Pop\'s crown jewel of car projects, Stude Ute was featured in the Grand National Roadster Show twice in its lifetime.',
    slug: 'studeute/'
  });

  posts.sort((a, b) => { return a.date < b.date ? -1 : 1; });

  return {
    props: {
      posts,
    },
  };
};

const Posts = ({ posts }) => {
  return (
    <>
      <h1>Pop&apos;s Pages</h1>
      <p>A place for Pop&apos;s stories and projects.</p>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.slug} className="">
            <Link className="p-8 block grid grid-cols-4 gap-4 mt-0 bg-transparent hover:bg-stone-200 dark:hover:bg-stone-800" href={`/pop/${post.slug}`}>
              <div className="">
                {post.thumbnail && <Image className="object-cover w-36 aspect-square max-w-36 rounded-lg"
                  src={post.thumbnail}
                  width={300}
                  height={300}
                  alt="cover"
                />}
              </div>
              <div className="col-span-3">
                <div className="text-stone-400 dark:text-stone-500 text-sm">{dayjs(post.date).utc().format('YYYY-MM-DD dddd')}</div>
                <h2 className="font-condensed text-2xl mb-2 mt-2">{post.title}</h2>
                <div className="text-stone-600 dark:text-stone-400 line-clamp-3">{post.excerpt}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Posts;
