import Head from 'next/head'
import { AppProps } from 'next/app'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import Giscus from '@giscus/react'

import collectHeadings from '@/util/collectHeadings'
import TableOfContents from '@/components/TableOfContents'

interface PostLayoutProps {
  pageProps: AppProps['pageProps']
  children?: React.ReactNode
}

const PostLayout: React.FC<PostLayoutProps> = ({ pageProps, children }) => {
  const { title, date, excerpt, thumbnail } = pageProps.markdoc.frontmatter
  const fmtDate = dayjs(date).format('MMMM D, YYYY')

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
      <article className="max-w-2xl">
        {headings && headings.length > 0 &&
          <TableOfContents
            headings={headings}
            minLevel={pageProps.markdoc?.frontmatter?.tocMinLevel}
            maxLevel={pageProps.markdoc?.frontmatter?.tocMaxLevel}
            className={pageProps.markdoc?.frontmatter?.tocClassName}
          />}
        <h1 className="">
          {title}
        </h1>
        <div className="mb-8 text-date">{fmtDate}</div>
        <div className="mb-16">{children}</div>
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
    </>
  )
}

export default PostLayout
