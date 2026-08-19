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
  serverExternalPackages: ["sharp", "bcryptjs"],
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-slot",
      "clsx",
      "tailwind-merge",
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: [
          "**/node_modules/**",
          "**/scratch/**",
          "**/scripts/**",
          "**/data/**",
          "**/*.tmp",
          "**/.git/**",
        ],
      };
    }
    return config;
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
