import { AppProps } from 'next/app'
import PostLayout from '@/layouts/PostLayout'
import BasicLayout from '@/layouts/BasicLayout'
import React from 'react'

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

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
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:flex-grow-0 md:basis-auto shadow-lg md:bg-shadebg-light dark:md:bg-shadebg-dark md:shadow-xl dark:shadow-shadeshadow-dark shadow-shadeshadow-light">
          <SiteHeader />
        </div>
        <div className="md:pt-[2.8rem] pb-8 md:flex-grow md:flex-shrink ml-4 mr-4 md:ml-12 md:mr-12 md:max-w-2xl min-h-screen">
          <PageLayout pageProps={pageProps}>
            <main>{children}</main>
          </PageLayout>
          <SiteFooter />
        </div>
      </div>
    </>
  )
}

export default SiteLayout
