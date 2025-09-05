/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api'),
  },
}

module.exports = nextConfig
