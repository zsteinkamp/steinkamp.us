/** @type {import('next').NextConfig} */
const withMarkdoc = require('@markdoc/next.js')

module.exports = withMarkdoc({ schemaPath: './markdoc' })({
  experimental: {
    scrollRestoration: true,
  },
  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/post/:slug*',
        destination: '/api/post/:slug*',
        permanent: false,
      },
    ]
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'marketplace.mypurecloud.com' },
      { hostname: '**.photobucket.com' },
      { hostname: 'i.ytimg.com' },
      { hostname: 'github.com' },
      { hostname: 'thenobot.org' },
      { hostname: 'www.thenobot.org' },
      { hostname: 'nobot.oceanairflightservices.com' },
      { hostname: '**.steinkamp.us' },
      { hostname: '**.static.flickr.com' },
      { hostname: '**.staticflickr.com' },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      'glob-promise': false,
      'gray-matter': false,
      'string-strip-html': false,
      dayjs: false,
    }
    return config
  },
})
