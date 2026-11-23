/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: '/api/proxy?url=:path*',
      },
    ];
  },
};

module.exports = nextConfig;
