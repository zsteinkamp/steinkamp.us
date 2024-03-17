import fs from 'fs'
import { Feed } from 'feed'
import { PostsListType } from './getPosts'

export default async function generateRssFeed(
  posts: PostsListType
): Promise<void> {
  const site_url = 'https://steinkamp.us/'

  //console.log('GENERATE RSS')

  const feedOptions = {
    title: 'steinkamp.us',
    description: "Zack Steinkamp's website posts.",
    id: site_url,
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`,
    },
  }

  const feed = new Feed(feedOptions)

  posts.slice(0, 50).forEach((post) => {
    let image = post.thumbnail
    if (post.thumbnail && !post.thumbnail.match(/^https?:\/\//)) {
      image = 'https://steinkamp.us' + post.thumbnail
    }
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
      image: image ? image.replaceAll('&', '&amp;') : undefined,
    })
  })

  // Write out static RSS files
  fs.writeFileSync('./public/rss.xml', feed.rss2())
  fs.writeFileSync('./public/rss.json', feed.json1())
  fs.writeFileSync('./public/atom.xml', feed.atom1())
}
