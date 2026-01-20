/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: false,
  experimental: {
    outputFileTracingIncludes: {
      '/(public)': [],
    },
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig