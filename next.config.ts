import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // FlatCompat + Next lint currently crashes the production build
  // ("Converting circular structure to JSON"). Keep `npm run lint` for local checks.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Serve modern formats when the browser supports them (CWV / LCP).
    formats: ["image/avif", "image/webp"],
    // Match qualities used across BrandLogo, trust, cases, blog, and hero.
    qualities: [70, 75, 80, 85],
    // Match global shell (1320px) plus common device widths.
    deviceSizes: [640, 750, 828, 1080, 1200, 1320, 1920],
    // Icon / badge / logo slots used in header, trust, AI chips.
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecomgliders.com",
      },
      {
        protocol: "https",
        hostname: "www.ecomgliders.com",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
};

export default nextConfig;
