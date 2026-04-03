import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "etamade-com.github.io",
      },
      {
        protocol: "https",
        hostname: "blog.lagrangeengineering.ro",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.lagrangeengineering.ro",
      },
    ],
  },
};

export default nextConfig;
