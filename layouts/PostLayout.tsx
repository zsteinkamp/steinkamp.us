import Head from 'next/head'
import { AppProps } from 'next/app'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import BackButton from '@/components/BackButton'
import Giscus from '@giscus/react'

interface PostLayoutProps {
  pageProps: AppProps['pageProps']
  children?: React.ReactNode
}

const PostLayout: React.FC<PostLayoutProps> = ({ pageProps, children }) => {
  const file = pageProps.markdoc.file.path
  const { title, date, excerpt, thumbnail } = pageProps.markdoc.frontmatter
  const fmtDate = dayjs(date).utc().format('MMMM D, YYYY')
  const fileParts = file.split('/')

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="title" content={title} />
        <meta property="og:title" content={title} />
        {excerpt && <meta name="description" content={excerpt} />}
        {excerpt && <meta property="og:description" content={excerpt} />}
        {thumbnail && <meta property="og:image" content={`https://steinkamp.us${thumbnail}`} />}
      </Head>
      <SiteHeader />
      <article className={`pl-4 pr-4 pt-8 pb-8 max-w-3xl min-h-screen m-auto`}>
        <div className="">
          <BackButton className="link float-right" />
          <header className="">
            <div className="">
              <div className="mt-4 text-stone-400">{fmtDate}</div>
              <h1 className="mb-8 font-bold font-condensed text-4xl">
                {title}
              </h1>
            </div>
          </header>
          <div className="">{children}</div>
          <BackButton className="link" />
        </div>
        <Giscus
          repo="zsteinkamp/steinkamp.us"
          repoId="R_kgDOJOYKlQ"
          category="Announcements"
          categoryId="DIC_kwDOJOYKlc4CdMxW"
          mapping="url"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          lang="en"
          loading="lazy"
        />
      </article>
      <SiteFooter />
    </>
  )
}

export default PostLayout
