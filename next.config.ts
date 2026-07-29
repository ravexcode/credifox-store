import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.telcel.com',
      },
      {
        protocol: 'https',
        hostname: 'fdn2.gsmarena.com',
      },
    ],
  },
};

export default nextConfig;
