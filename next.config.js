/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })

// module.exports = withBundleAnalyzer({})
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['www.cryptocompare.com', 'images.cryptocompare.com', 'cdn-icons-png.flaticon.com'],
  },
}
module.exports = nextConfig
