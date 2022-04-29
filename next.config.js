/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['www.cryptocompare.com', 'images.cryptocompare.com', 'cdn-icons-png.flaticon.com'],
  },
  async redirects() {
    return [
      {
        source: '/coins',
        destination: '/coins/btc',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
