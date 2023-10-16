import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    if (!router.query.slug || router.query.slug.length !== 4) {
      router.push('/')
      return
    }
    const year = router.query.slug[0]
    const month = router.query.slug[1]
    const day = router.query.slug[2]
    let name = router.query.slug[3]

    name = name.replace(/\.html$/, '')

    router.push(`/posts/${year}-${month}-${day}-${name}`)
  }, [])

  return <p>Redirecting...</p>
  //return <p>{router.query.slug}</p>
}

//import { redirect } from 'next/navigation'
//
//export default async function OldPost({ params }) {
//  const team = await fetchTeam(params.id)
//  if (!team) {
//    redirect('/login')
//  }
//}

//import type { NextApiRequest, NextApiResponse } from 'next'
//
//function getPath(slug: string[]): string {
//  return slug.join('/')
//}
//
//export default function handler(req: NextApiRequest, res: NextApiResponse) {
//  let { slug } = req.query
//  let dest = '/'
//  if (!slug) {
//    return res.redirect('/')
//  }
//  if (typeof slug === 'string') {
//    slug = [slug]
//  }
//  return res.redirect(getPath(slug))
//}