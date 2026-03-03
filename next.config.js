/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/ishan-portfolio',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    eslint: {
        // Pre-existing ESLint issues (motion JSX usage); address separately
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
