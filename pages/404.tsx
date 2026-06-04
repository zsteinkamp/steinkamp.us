import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found · steinkamp.us</title>
        <meta name='robots' content='noindex' />
      </Head>
      <h1>404 — This page wandered off</h1>
      <p>
        The link you followed is broken, or the page has moved, or it never
        existed in the first place. No harm done.
      </p>
      <p>
        Head back to the <Link href='/'>home page</Link> to find something worth
        reading, or learn a bit <Link href='/about'>about me</Link>.
      </p>
    </>
  )
}
