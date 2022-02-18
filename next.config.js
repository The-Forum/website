/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.coingecko.com"],
  },
  experimental: {
    scrollRestoration: true,
  },
  distDir: "build",
};
const withTM = require("next-transpile-modules")(["react-chatbox-component"]);

module.exports = withTM({ nextConfig });
