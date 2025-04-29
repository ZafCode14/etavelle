import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-a06fd440460b4a3fac7f08ea1cf1e173.r2.dev",
        pathname: "/**", // Add the new hostname here
      },
    ],
  }
};

export default nextConfig;