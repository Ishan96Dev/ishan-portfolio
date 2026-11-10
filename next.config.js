/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

// Security headers applied to all routes
const securityHeaders = [
    // Prevent clickjacking — only allow framing from same origin
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    // Disable MIME-type sniffing
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    // Control referrer information sent to third parties
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
    },
    // Restrict browser feature access
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
    // Force HTTPS for 2 years, include sub-domains
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },
    // Basic XSS protection for older browsers (belt-and-suspenders)
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    // Content Security Policy — allows self + trusted CDNs (Google Fonts, Vercel analytics)
    {
        key: 'Content-Security-Policy',
        value: [
            "default-src 'self'",
            // Scripts: self + Vercel analytics/speed-insights.
            // 'unsafe-eval' is added in dev only — React needs it for call-stack reconstruction
            // and hot-module replacement. Production builds never use eval().
            `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com https://vercel.live`,
            // Styles: self + inline (Tailwind/CSS-in-JS) + Google Fonts
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Images: self + data URIs (for inline SVGs) + blob:
            "img-src 'self' data: blob:",
            // Fonts: self + Google Fonts CDN
            "font-src 'self' https://fonts.gstatic.com",
            // Connections: self + GitHub API (activity section) + Vercel analytics endpoints
            "connect-src 'self' https://api.github.com https://github-contributions-api.jogruber.de https://vitals.vercel-insights.com https://va.vercel-scripts.com",
            // Workers, objects: none
            "worker-src 'none'",
            "object-src 'none'",
            // Frames: none (portfolio has no iframes)
            "frame-src 'none'",
            // Upgrade HTTP requests to HTTPS
            "upgrade-insecure-requests",
        ].join('; '),
    },
];

const nextConfig = {
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
    // Apply security headers to all routes
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
