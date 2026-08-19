import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // The full college landing lives at the root (/).
  // /lfjc permanently redirects to avoid duplicate content (SEO)
  // and to give visitors a single canonical entry point.
  async redirects() {
    return [
      {
        source: "/lfjc",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
