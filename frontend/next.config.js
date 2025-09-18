/** @type {import('next').NextConfig} */
const fs = require('fs');
const dotenv = require('dotenv');
const env = dotenv.parse(fs.readFileSync('.env'));

const nextConfig = {
  reactStrictMode: true,
  env: env,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://prachomklao-lms.onrender.com/api/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;