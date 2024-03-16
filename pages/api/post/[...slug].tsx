import type { NextApiRequest, NextApiResponse } from 'next'

function getPath(slug: string[]): string {
  if (slug.length !== 4) {
    return '/'
  }
  const year = slug[0]
  const month = slug[1]
  const day = slug[2]
  let name = slug[3]

  name = name.replace(/\.html$/, '')
  name = name.replace(/-post$/, '')

  return `/posts/${year}-${month}-${day}-${name}`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let { slug } = req.query
  if (!slug) {
    return res.redirect('/')
  }
  if (typeof slug === 'string') {
    slug = [slug]
  }
  return res.redirect(getPath(slug))
}
