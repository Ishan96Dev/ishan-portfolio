import './globals.css';

export const metadata = {
    metadataBase: new URL('https://ishan96dev.github.io/ishan-portfolio'),
    title: {
        default: 'Ishan Chakraborty | QA Engineer & AI/ML Testing Specialist',
        template: '%s | Ishan Chakraborty',
    },
    description:
        'Portfolio of Ishan Chakraborty — QA Engineer, AI/ML Testing Specialist, RAG & Agentic AI Enthusiast, and Full Stack Developer based in Kolkata, India. Experienced in automation testing, AI systems, and building robust digital products.',
    keywords: [
        'Ishan Chakraborty',
        'QA Engineer',
        'AI Testing',
        'ML Testing',
        'RAG',
        'Agentic AI',
        'Full Stack Developer',
        'Automation Testing',
        'Kolkata',
        'Portfolio',
        'Software Engineer',
        'Selenium',
        'Python',
        'React',
    ],
    authors: [{ name: 'Ishan Chakraborty', url: 'https://github.com/Ishan96Dev' }],
    creator: 'Ishan Chakraborty',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://ishan96dev.github.io/ishan-portfolio',
        siteName: 'Ishan Chakraborty Portfolio',
        title: 'Ishan Chakraborty | QA Engineer & AI/ML Testing Specialist',
        description:
            'Portfolio of Ishan Chakraborty — QA Engineer, AI/ML Testing Specialist, RAG & Agentic AI Enthusiast, and Full Stack Developer.',
        images: [
            {
                url: '/ishan-portfolio/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Ishan Chakraborty Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ishan Chakraborty | QA Engineer & AI/ML Testing Specialist',
        description:
            'Portfolio of Ishan Chakraborty — QA Engineer, AI/ML Testing Specialist, RAG & Agentic AI Enthusiast, and Full Stack Developer.',
        images: ['/ishan-portfolio/og-image.png'],
        creator: '@Ishan96Dev',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/ishan-portfolio/favicon.svg',
    },
    alternates: {
        canonical: 'https://ishan96dev.github.io/ishan-portfolio',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: 'Ishan Chakraborty',
                            url: 'https://ishan96dev.github.io/ishan-portfolio',
                            jobTitle: 'QA Engineer & AI/ML Testing Specialist',
                            description:
                                'QA Engineer, AI/ML Testing Specialist, RAG & Agentic AI Enthusiast, Full Stack Developer',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Kolkata',
                                addressRegion: 'West Bengal',
                                addressCountry: 'IN',
                            },
                            sameAs: [
                                'https://github.com/Ishan96Dev',
                                'https://www.linkedin.com/in/ishan-chakraborty-0085571a1',
                            ],
                            knowsAbout: [
                                'QA Engineering',
                                'AI Testing',
                                'ML Testing',
                                'RAG Systems',
                                'Agentic AI',
                                'Full Stack Development',
                                'Automation Testing',
                            ],
                        }),
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
