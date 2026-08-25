import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // Removed basePath & assetPrefix for better GitHub Pages compatibility
  // Static export will use relative paths which work reliably on GitHub Pages
};

export default nextConfig;
