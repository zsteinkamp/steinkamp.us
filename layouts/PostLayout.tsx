import Head from 'next/head'
import { AppProps } from 'next/app'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import Giscus from '@giscus/react'

import collectHeadings from '@/util/collectHeadings'
import TableOfContents from '@/components/TableOfContents'
import {
  SSK_FILTER,
  SSK_MAX_DATE,
  SSK_MIN_DATE,
  SSK_SEL_TAGS,
  hasSessionStorage,
} from '@/components/PostFilter'

interface PostLayoutProps {
  pageProps: AppProps['pageProps']
  children?: React.ReactNode
}

const PostLayout: React.FC<PostLayoutProps> = ({ pageProps, children }) => {
  const { title, date, excerpt, thumbnail, tags } =
    pageProps.markdoc.frontmatter
  const fmtDate = dayjs(date).format('MMMM D, YYYY')

  const headings = collectHeadings(pageProps.markdoc.content)

  const handleTagClick = (tag: string) => {
    if (hasSessionStorage()) {
      window.sessionStorage.removeItem(SSK_MIN_DATE)
      window.sessionStorage.removeItem(SSK_MAX_DATE)
      window.sessionStorage.removeItem(SSK_FILTER)
      window.sessionStorage.setItem(
        SSK_SEL_TAGS,
        JSON.stringify({ [tag]: true })
      )
      window.location.href = '/'
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content='article' />
        <meta property='og:locale' content='en_US' />
        <meta property='title' content={title} />
        <meta property='og:title' content={title} />
        {excerpt && <meta name='description' content={excerpt} />}
        {excerpt && <meta property='og:description' content={excerpt} />}
        {thumbnail && (
          <meta
            property='og:image'
            content={`https://steinkamp.us${thumbnail}`}
          />
        )}
      </Head>
      <article className='max-w-2xl relative'>
        {headings && headings.length > 0 && (
          <TableOfContents
            headings={headings}
            minLevel={pageProps.markdoc?.frontmatter?.tocMinLevel}
            maxLevel={pageProps.markdoc?.frontmatter?.tocMaxLevel}
            className={pageProps.markdoc?.frontmatter?.tocClassName}
          />
        )}
        <h1 className=''>{title}</h1>
        <div className='text-date'>{fmtDate}</div>
        {tags && (
          <div className='flex flex-wrap'>
            {tags.map((tag: string) => {
              return (
                <div key={tag} className='mt-2 mb-1'>
                  <label
                    onClick={() => handleTagClick(tag)}
                    className={`border-1 mr-1 cursor-pointer rounded border-shadeshadow
                  bg-shadebg py-1 px-2 text-xs hover:bg-link-hover`}
                  >
                    {tag}
                  </label>
                </div>
              )
            })}
          </div>
        )}
        <div className='mt-8 mb-16'>{children}</div>
        <Giscus
          repo='zsteinkamp/steinkamp.us'
          repoId='R_kgDOJOYKlQ'
          category='Announcements'
          categoryId='DIC_kwDOJOYKlc4CdMxW'
          mapping='url'
          strict='0'
          reactionsEnabled='1'
          emitMetadata='0'
          inputPosition='bottom'
          lang='en'
          loading='lazy'
        />
      </article>
    </>
  )
}

export default PostLayout
