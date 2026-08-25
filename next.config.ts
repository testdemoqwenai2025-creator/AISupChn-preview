import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // CRITICAL: basePath for GitHub Pages deployment at /AISupChn-preview/
  basePath: "/AISupChn-preview",
  assetPrefix: "/AISupChn-preview",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
