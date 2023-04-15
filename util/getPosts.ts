import fs from "fs";
import fsp from "fs/promises";
import getDirMeta from '@/util/getDirMeta'
import glob from "glob-promise";
import matter from "gray-matter";
import path from "path";
import { stripHtml } from "string-strip-html";
import yaml from 'js-yaml';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const getPosts = async ({indexPath, newestFirst = true}) => {
  // Find all Markdown files in the specified directory
  const POSTS_DIR = path.join(process.cwd(), "pages", indexPath);
  const postsPath = (await glob("*", { cwd: POSTS_DIR }))

  const posts = (await Promise.all(postsPath.map(async (postPath) => {
    if (postPath.match(/\.md$/)) {
      // get the slug from the markdown file name
      let slug = path.join('/', indexPath, path.basename(postPath, path.extname(postPath)));
      // read the markdown files
      const source = await fsp.readFile(path.join(POSTS_DIR, postPath), "utf8");
      // use gray-matter to parse the post frontmatter section
      const { content, data } = matter(source);

      let thumbnail = null;

      if (data && data.thumbnail) {
        thumbnail = data.thumbnail;
      }
      if (data && data.source === 'youtube') {
        thumbnail = 'https://i.ytimg.com/vi/' + data.uid + '/default.jpg';
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
        date: dayjs(data.date).utc().toISOString(),
        type: data.source || "post",
        excerpt: excerpt,
        thumbnail,
        slug
      };
    }
    const fullPath = path.join(POSTS_DIR, postPath);
    const stat = await fsp.stat(fullPath);
    const isDir = stat.isDirectory();
    if (isDir) {
      console.log(fullPath);
      return await getDirMeta(fullPath);
    }
    return null;
  }))).filter((e) => !!e);

  // sort posts
  posts.sort((a, b) => {
    if (newestFirst) {
      return b.date < a.date ? -1 : 1;
    }
    return b.date > a.date ? -1 : 1;
  });

  return posts;
};

export default getPosts;
