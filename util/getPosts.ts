import fs from "fs";
import fsp from "fs/promises";
import getDirMeta from '@/util/getDirMeta'
import glob from "glob-promise";
import Markdoc from '@markdoc/markdoc';
import path from "path";
import React from 'react'; // or 'preact'
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
      const ast = Markdoc.parse(source);
      const data = ast.attributes.frontmatter
        ? yaml.load(ast.attributes.frontmatter)
        : {};

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
        const content = Markdoc.transform(ast);
        const html = Markdoc.renderers.html(content)
        excerpt = stripHtml(html).result.substr(0, 512);
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
