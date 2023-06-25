import { AppProps } from 'next/app'
import PostLayout from '@/layouts/PostLayout'
import BasicLayout from '@/layouts/BasicLayout'
import React from 'react'

interface SiteLayoutProps {
  pageProps: AppProps['pageProps']
  children?: React.ReactNode
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ pageProps, children }) => {
  let PageLayout = BasicLayout

  if (pageProps.markdoc?.frontmatter?.layout === 'post') {
    PageLayout = PostLayout
  }

  return (
    <PageLayout pageProps={pageProps}>
      <main>{children}</main>
    </PageLayout>
  )
}

export default SiteLayout
