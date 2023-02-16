const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_URL,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: process.env.BASE_URL,
        basePath: false,
        permanent: false
      }
    ]
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  env: {
    BACKEND_API: process.env.BACKEND_API,
    BASE_URL: process.env.BASE_URL
  }
}

module.exports = nextConfig
