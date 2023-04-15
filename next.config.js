/** @type {import('next').NextConfig} */
const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({ schemaPath: './markdoc' })({
  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'marketplace.mypurecloud.com' },
      { hostname: '**.photobucket.com' },
      { hostname: 'i.ytimg.com' },
      { hostname: '**.steinkamp.us' },
      { hostname: '**.static.flickr.com' },
      { hostname: '**.staticflickr.com' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
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
    return config;
  },
});
