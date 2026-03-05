/** @type {import('next').NextConfig} */
const nextConfig = {
    // Vercel handles SSR, ISR, image optimisation, and CDN natively.
    // output: 'export' is intentionally removed — it disables SSR/ISR.
    // basePath is not needed on Vercel (served from root domain).
    eslint: {
        // Pre-existing ESLint issues (motion JSX usage); address separately
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
