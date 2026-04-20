/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "stushort.com" },
      { protocol: "https", hostname: "www.stushort.com" }
    ]
  }
};

export default nextConfig;
