/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'www.dolarya.info',
      },
      {
        protocol: 'https',
        hostname: 'pub-c0032241f78241309bb4e2d7dcc923c7.r2.dev',
      },
    ]
  },
}

module.exports = nextConfig
