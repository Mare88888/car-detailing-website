/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
}

module.exports = nextConfig
