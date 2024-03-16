import { AppProps } from 'next/app'
import PostLayout from '@/layouts/PostLayout'
import BasicLayout from '@/layouts/BasicLayout'
import React from 'react'

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Head from 'next/head'

interface SiteLayoutProps {
  pageProps: AppProps['pageProps']
  className?: string
  children?: React.ReactNode
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ pageProps, children }) => {
  let PageLayout = BasicLayout

  if (pageProps.markdoc?.frontmatter?.layout === 'post') {
    PageLayout = PostLayout
  }

  return (
    <>
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title='RSS Feed for steinkamp.us'
          href='/rss.xml'
        />
        <link
          rel='alternate'
          type='application/rss+json'
          title='RSS+JSON Feed for steinkamp.us'
          href='/rss.json'
        />
        <link
          rel='alternate'
          type='application/atom+xml'
          title='ATOM Feed for steinkamp.us'
          href='/atom.xml'
        />
      </Head>
      <div className='md:flex'>
        <div className='bg-shadebg shadow-lg shadow-shadeshadow md:flex-shrink-0 md:flex-grow-0 md:basis-auto md:shadow-xl'>
          <SiteHeader />
        </div>
        <div className='ml-4 mr-4 min-h-screen pb-8 md:ml-12 md:mr-12 md:max-w-2xl md:flex-shrink md:flex-grow md:pt-[2.8rem]'>
          <h2 className='m-0 h-0 p-0 leading-[0px]' id='top'></h2>
          <PageLayout pageProps={pageProps}>
            <main className="min-h-[75vh]">{children}</main>
          </PageLayout>
          <SiteFooter />
        </div>
      </div>
    </>
  )
}

export default SiteLayout
