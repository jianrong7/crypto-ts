/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.coingecko.com", "www.larvalabs.com"],
  },
};

module.exports = nextConfig;
