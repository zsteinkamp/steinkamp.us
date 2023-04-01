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
    const slug = path.basename(postPath, path.extname(postPath));
    // read the markdown files
    const source = fs.readFileSync(
      path.join(process.cwd(), "pages/posts", postPath),
      "utf8"
    );
    // use gray-matter to parse the post frontmatter section
    const { content, data } = matter(source);

    let cover = null;

    if (data && data.entry && data.entry.data && data.entry.data.thumb_url) {
      cover = data.entry.data.thumb_url;
    }
    if (data.entry.source === 'youtube') {
      cover = 'https://i.ytimg.com/vi/' + data.entry.data.id + '/default.jpg';
    }

    let excerpt = null;
    if (data.entry && data.entry.data && data.entry.data.excerpt) {
      excerpt = data.entry.data.excerpt;
    }
    if (excerpt === null) {
      excerpt = stripHtml(content).result.substr(0, 512);
    }

    return {
      title: data.title,
      date: dayjs(data.date).format("YYYY-MM-DD dddd"),
      type: data.entry.source,
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
          <Link className="grid grid-cols-4 gap-2 mt-0 mb-16" href={`/posts/${post.slug}`}>
            <div className="">
              {post.cover && <Image className="object-cover w-36 h-36"
                src={post.cover}
                width={300}
                height={300}
                alt="cover"
              />}
            </div>
            <div className="col-span-3">
              <div className="text-slate-400 text-sm">{post.date} / {post.type}</div>
              <h2 className="font-condensed text-2xl mb-2 mt-2">{post.title}</h2>
              <div className="text-slate-600 line-clamp-3">{post.excerpt}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default Posts;
