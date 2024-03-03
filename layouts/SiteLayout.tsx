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
        <div className="md:flex-shrink-0 md:flex-grow-0 md:basis-auto shadow-lg">
          <SiteHeader />
        </div>
        <div className="md:flex-grow md:flex-shrink md:max-w-4xl">
          <PageLayout pageProps={pageProps}>
            <main>{children}</main>
          </PageLayout>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}

export default SiteLayout
