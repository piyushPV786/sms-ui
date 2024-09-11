/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/student',
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  experimental: {
    esmExternals: false,
    typedRoutes: true
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
    config.cache = {
      type: 'filesystem'
    }
    config.resolve.alias = {
      ...config.resolve.alias
    }

    if (config.watchOptions) {
      config.watchOptions.ignored = config.watchOptions.ignored || []
    }

    return config
  }
}

module.exports = nextConfig
