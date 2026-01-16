/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ludo-star-nextjs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ludo-star-nextjs/' : '',
}

module.exports = nextConfig
