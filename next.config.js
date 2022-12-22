/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flowbite.com"],
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT
  },
  
};
module.exports = nextConfig;
