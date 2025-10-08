import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow both remote and local image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'sachinmanral.com',
      },
    ],
    unoptimized: true, // make it false if there is backend
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
