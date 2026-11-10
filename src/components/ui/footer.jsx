'use client';

import { resumeData } from '@/data/resume';
import { Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl mt-20">
            <div className="container mx-auto px-6 py-12 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <p className="text-2xl font-bold tracking-tighter text-foreground" aria-label="Ishan Chakraborty">
                            IC.
                        </p>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Building robust AI systems and seamless digital experiences.
                        </p>
                    </div>

                    {/* Footer navigation — separate landmark from main nav */}
                    <nav aria-label="Footer navigation">
                        <h2 className="font-semibold text-foreground mb-4">Navigation</h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#hero" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">Home</a></li>
                            <li><a href="#about" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">About</a></li>
                            <li><a href="#projects" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">Projects</a></li>
                        </ul>
                    </nav>

                    <div className="space-y-4">
                        <h2 className="font-semibold text-foreground">Contact</h2>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href={`mailto:${resumeData.email}`}
                                    className="hover:text-primary transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                                >
                                    {/* WCAG 1.1.1 — icon is decorative; link text provides context */}
                                    <Mail size={14} aria-hidden="true" />
                                    {resumeData.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${resumeData.emailAlt}`}
                                    className="hover:text-primary transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                                >
                                    <Mail size={14} aria-hidden="true" />
                                    <span>
                                        {resumeData.emailAlt}{" "}
                                        <span className="text-xs opacity-70">(Alt)</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${resumeData.phone}`}
                                    className="hover:text-primary transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                                >
                                    {/* WCAG 1.1.1 — decorative phone icon, aria-hidden */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    {resumeData.phone}
                                </a>
                            </li>
                            <li className="inline-flex items-center gap-2">
                                {/* WCAG 1.1.1 — decorative location icon, aria-hidden */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                {resumeData.location}
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-semibold text-foreground">Socials</h2>
                        {/* WCAG 1.1.1, 4.1.2 — each social link has a descriptive aria-label; icons are decorative */}
                        <div className="flex gap-4" role="list" aria-label="Social profiles">
                            {resumeData.social.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        role="listitem"
                                        aria-label={`${social.name} profile (opens in new tab)`}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                                    >
                                        <Icon size={18} aria-hidden="true" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Ishan Chakraborty. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Designed with Next.js, React &amp; Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}
