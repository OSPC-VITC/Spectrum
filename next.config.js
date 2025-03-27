/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'plus.unsplash.com',
      'images.unsplash.com',
      'media.istockphoto.com',
      'plus.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.istockphoto.com',
      }
    ],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
    dangerouslyAllowSVG: true, // Allow SVG images
    contentDispositionType: 'attachment', // Improve security
  },
  // Add Gzip compression
  compress: true,
  // Optimize build output
  swcMinify: true,
  // Reduce JavaScript bundle size
  reactStrictMode: true,
  // Optimize for production builds
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig 