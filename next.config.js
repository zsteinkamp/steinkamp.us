/** @type {import('next').NextConfig} */
const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({ schemaPath: './markdoc' })({
  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'marketplace.mypurecloud.com' },
      { hostname: 'cdn.discogs.com' },
      { hostname: 'cdn-data.motu.com' },
      { hostname: '360.io' },
      { hostname: 'ohlone50k.com' },
      { hostname: '**.zombierunner.com' },
      { hostname: '**.businessinsider.com' },
      { hostname: '**.photobucket.com' },
      { hostname: 'i.ytimg.com' },
      { hostname: '**.steinkamp.us' },
      { hostname: '**.static.flickr.com' },
      { hostname: '**.staticflickr.com' },
    ],
  },
});
