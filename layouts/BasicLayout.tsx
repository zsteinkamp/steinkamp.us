import Head from 'next/head'
import { AppProps } from 'next/app'

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

interface BasicLayoutProps {
  pageProps: AppProps['pageProps']
  children?: React.ReactNode
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ pageProps, children }) => {
  const { title, description } = pageProps.markdoc?.frontmatter || {
    title: 'steinkamp.us',
    description: 'steinkamp.us',
  }

  const outerClass = pageProps.markdoc?.frontmatter?.outerClass || ''

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
      <SiteHeader />
      <div className={`pl-4 pr-4 max-w-3xl min-h-screen m-auto basic-outer ${outerClass}`}>
        {children}
      </div>
      <SiteFooter />
    </>
  )
}

export default BasicLayout
