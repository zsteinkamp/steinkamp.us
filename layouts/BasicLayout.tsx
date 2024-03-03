import Head from 'next/head'
import { AppProps } from 'next/app'

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
      <div className={`md:ml-12 md:mt-[2.8rem] min-h-screen ${className} ${outerClass}`}>
        {children}
      </div>
    </>
  )
}

export default BasicLayout
