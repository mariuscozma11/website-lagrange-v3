import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "etamade-com.github.io",
      },
    ],
  },
};

export default nextConfig;
