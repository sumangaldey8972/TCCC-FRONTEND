import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // keep Unsplash
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ allow Cloudinary
      },
      {
        protocol: "https",
        hostname: "samdigitalsolutions.ae"
      }
    ],
  },
};

export default nextConfig;
