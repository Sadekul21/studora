import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
    images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    if (!process.env.API_URL) return [];

    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
