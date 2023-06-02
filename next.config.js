const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid'
])

module.exports = withTM({
  basePath: '/student',
  trailingSlash: true,
  reactStrictMode: false,
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
    // eslint-disable-next-line no-undef
    NEXT_PUBLIC_ENROLMENT_BACKEND_API: process.env.NEXT_PUBLIC_ENROLMENT_BACKEND_API,
    NEXT_PUBLIC_ACADEMIC_BACKEND_API: process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_API,
    NEXT_PUBLIC_STUDENT_BASE_URL: process.env.NEXT_PUBLIC_STUDENT_BASE_URL
  }
})
