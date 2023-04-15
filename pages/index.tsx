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
  const POSTS_DIR = path.join(process.cwd(), "pages/posts");
  const postsPath = (await glob("**/*.md", { cwd: POSTS_DIR }))
  
  // sort descending date
  postsPath.sort((a,b) => { return b < a ? -1 : 1; });

  const posts = postsPath.map((postPath) => {
    // get the slug from the markdown file name
    let slug = '/posts/' + path.basename(postPath, path.extname(postPath));
    // read the markdown files
    const source = fs.readFileSync(
      path.join(process.cwd(), "pages/posts", postPath),
      "utf8"
    );
    // use gray-matter to parse the post frontmatter section
    const { content, data } = matter(source);

    let cover = null;

    if (data && data.thumbnail) {
      cover = data.thumbnail;
    }
    if (data && data.source === 'youtube') {
      cover = 'https://i.ytimg.com/vi/' + data.uid + '/default.jpg';
      slug = 'https://youtu.be/' + data.uid;
    }

    let excerpt = null;
    if (data && data.excerpt) {
      excerpt = data.excerpt;
    }
    if (excerpt === null) {
      // TODO parse markdown
      excerpt = stripHtml(content).result.substr(0, 512);
    }

    return {
      title: data.title,
      date: dayjs(data.date).format("MMMM, YYYY"),
      type: data.source || "post",
      excerpt: excerpt,
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
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.slug} className="">
          <Link className="grid grid-cols-4 gap-4 p-8 rounded-lg mt-0 bg-transparent hover:bg-stone-200 dark:hover:bg-stone-800" href={post.slug}>
            <div className="">
              {post.cover && <Image className="object-cover w-36 aspect-square max-w-36 rounded-lg"
                src={post.cover}
                width={300}
                height={300}
                alt="cover"
              />}
            </div>
            <div className="col-span-3">
              <div className="text-stone-400 dark:text-stone-500 text-sm">{post.date}</div>
              <h2 className="font-condensed text-2xl mb-2 mt-2">{post.title}</h2>
              <div className="text-stone-600 dark:text-stone-400 line-clamp-3">{post.excerpt}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default Posts;
