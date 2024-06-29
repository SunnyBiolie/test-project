/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "telegraph-image-bak.pages.dev",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn22-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
