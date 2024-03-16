import Head from 'next/head'
import { AppProps } from 'next/app'

import collectHeadings from '@/util/collectHeadings'
import TableOfContents from '@/components/TableOfContents'

interface BasicLayoutProps {
  pageProps: AppProps['pageProps']
  className?: string
  children?: React.ReactNode
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ pageProps, className = "", children }) => {
  const { title, description } = pageProps.markdoc?.frontmatter || {
    title: 'steinkamp.us',
    description: 'steinkamp.us',
  }

  let outerClass = null
  let headings = null

  if (pageProps.markdoc) {
    outerClass = pageProps.markdoc.frontmatter?.outerClass || ''
    if (pageProps.markdoc.frontmatter?.tableOfContents) {
      headings = collectHeadings(pageProps.markdoc.content)
    }
  }

  return (
    <>
      <Head>
        <title>{title || 'steinkamp.us'}</title>
        <meta name="description" content={description || 'steinkamp.us'} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="title" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={`${className} ${outerClass}`}>
        {headings && <TableOfContents headings={headings} minLevel={pageProps.markdoc?.frontmatter?.tocMinLevel} maxLevel={pageProps.markdoc?.frontmatter?.tocMaxLevel} className={pageProps.markdoc?.frontmatter?.tocClassName} />}
        {children}
      </div>
    </>
  )
}

export default BasicLayout
