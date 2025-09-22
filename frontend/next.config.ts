import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false, // Enable optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bucket-production-3751.up.railway.app',
        port: '',
        pathname: '/formalitys-uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.up.railway.app',
        port: '',
        pathname: '/formalitys-uploads/**',
      },
      // Add your S3 endpoint domain as well
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        port: '',
        pathname: '/formalitys-uploads/**',
      },
    ],
  },
  eslint: { 
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
