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
      <article className="max-w-2xl">
        {headings && headings.length > 0 && <TableOfContents headings={headings} className="mt-[0.5rem]" />}
        <h1 className="">
          {title}
        </h1>
        <div className="mb-8 text-date-light dark:text-date-dark">{fmtDate}</div>
        <div className="">{children}</div>
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
