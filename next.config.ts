import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "grandrestaurantv6.b-cdn.net"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // increase as needed
    },
  },
};
module.exports = nextConfig;