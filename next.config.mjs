/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // Opt-in self-contained server (.next/standalone) for container/self-host
  // deploys — set BUILD_STANDALONE=1 (the Dockerfile does). Left off by default
  // so the standard `npm run build && npm start` flow works with no warning.
  // Platforms like Vercel build their own output and ignore this either way.
  output: process.env.BUILD_STANDALONE === "1" ? "standalone" : undefined,
  // Long-cache the immutable PWA icons; keep the service worker fresh.
  async headers() {
    return [
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};
export default nextConfig;
