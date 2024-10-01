/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // Allow all paths from Firebase Storage
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**', // Allow all paths from YouTube
      },
    ],
  },
  // Add other configurations as needed
};

module.exports = nextConfig;
