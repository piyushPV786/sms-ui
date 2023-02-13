/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/student',
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
        destination: '/student',
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
    auth_Url: process.env.NEXT_PUBLIC_Auth_URL,
    base_Url: process.env.NEXT_PUBLIC_BASE_URL
  }
}

module.exports = nextConfig
