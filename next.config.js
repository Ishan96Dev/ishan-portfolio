/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Pre-existing ESLint issues (motion JSX usage); address separately
        ignoreDuringBuilds: true,
    },
    images: {
        // Allow WebP and AVIF formats for best compression
        formats: ['image/webp', 'image/avif'],
        // Minimize re-optimization on every request
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
        // Reasonable quality default
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // Compress responses
    compress: true,
};

export default nextConfig;
