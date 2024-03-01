import Head from 'next/head'
import { AppProps } from 'next/app'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Giscus from '@giscus/react'

import collectHeadings from '@/util/collectHeadings'
import TableOfContents from '@/components/TableOfContents'
import DarkSwitcher from '@/components/DarkSwitcher'

interface PostLayoutProps {
  pageProps: AppProps['pageProps']
  children?: React.ReactNode
}

const PostLayout: React.FC<PostLayoutProps> = ({ pageProps, children }) => {
  const file = pageProps.markdoc.file.path
  const { title, date, excerpt, thumbnail, toc } = pageProps.markdoc.frontmatter
  const fmtDate = dayjs(date).utc().format('MMMM D, YYYY')

  const headings = collectHeadings(pageProps.markdoc.content)

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
      <div className="header-content">
        <SiteHeader />
        <article className={`pl-4 pr-4 pt-8 pb-8 max-w-3xl min-h-screen m-auto`}>
          <DarkSwitcher />
          <div className="">
            <header className="">
              <div className="">
                <h1 className="mt-3 font-bold font-header text-4xl">
                  {title}
                </h1>
                <div className="mb-8 text-stone-400">{fmtDate}</div>
              </div>
            </header>
            <div className="mainArea">
              {headings && headings.length > 0 && <TableOfContents headings={headings} className="" />}
              <div className="">{children}</div>
            </div>
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
      </div>
      <SiteFooter />
    </>
  )
}

export default PostLayout
