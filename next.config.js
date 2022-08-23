/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

module.exports = {
  images: {
    domains: ["www.runoob.com"],
  },
  reactStrictMode: false,
  swcMinify: true,
  ...withLess({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  }),
};
