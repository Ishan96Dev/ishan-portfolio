'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { resumeData } from '@/data/resume';

// Live demo URLs for projects that have deployed instances
const LIVE_DEMOS = {
    'SentimentScope NLP Analyzer': 'https://huggingface.co/spaces/Ishan96Dev/SentimentScope',
    'DocForge Web-to-PDF':          'https://docforge.streamlit.app',
    'AI Sentiment Analyzer':        'https://ai-sentiment-analyzer.streamlit.app',
};

// Featured projects displayed in the primary grid
const FEATURED_IDS = [
    'MCP OpenAI Image Generator',
    'YesBill – AI Billing Tracker',
    'Document Knowledge Retrieval',
    'DocForge Web-to-PDF',
    'SentimentScope NLP Analyzer',
    'HeliosConnect – AI Networking Agent',
];

// ─── Single project card ──────────────────────────────────────────────────────
// All cards share the same DOM structure — no inline `style` height differences.
// Uniform sizing is achieved by: grid `auto-rows: 1fr` on the parent grid, and
// `h-full flex flex-col` on the article, so every card in the same row is the
// same height regardless of content length.
function ProjectCard({ project }) {
    const shouldReduceMotion = useReducedMotion();
    const liveUrl = LIVE_DEMOS[project.title];

    return (
        <motion.article
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            /* WCAG 2.3.3 — lift animation only fires when motion is allowed */
            whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            /* h-full + flex flex-col ensures cards fill the grid row height */
            className="h-full flex flex-col rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-teal-500/40 hover:shadow-[0_8px_32px_rgba(20,184,166,0.08)] transition-all duration-300 overflow-hidden group"
            aria-label={project.title}
        >
            {/* Fixed-height thumbnail — identical across all cards */}
            <div className="relative h-48 flex-shrink-0 overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        loading="lazy"
                        quality={75}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-neutral-600 text-sm">No preview</span>
                    </div>
                )}
                {/* Bottom fade gradient — decorative */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent"
                    aria-hidden="true"
                />
            </div>

            {/* Content — flex-1 makes this area stretch to fill remaining height */}
            <div className="flex flex-col flex-1 p-6">
                <h3 className="font-bold text-neutral-100 text-base leading-tight mb-2">
                    {project.title}
                </h3>

                {/* Description grows to fill available space, pushing buttons to the bottom */}
                <p className="text-neutral-400 text-sm leading-relaxed flex-1 mb-4">
                    {project.description}
                </p>

                {/* Tech tags */}
                <ul
                    className="flex flex-wrap gap-1.5 mb-5"
                    aria-label={`Technologies: ${project.tech.join(', ')}`}
                >
                    {project.tech.map((t) => (
                        <li
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                            {t}
                        </li>
                    ))}
                </ul>

                {/* Action buttons — always at the bottom of the card */}
                <div className="flex items-center gap-3 mt-auto flex-wrap">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-neutral-700 text-neutral-300 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-900"
                        >
                            <Github size={14} aria-hidden="true" />
                            GitHub
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live demo of ${project.title} (opens in new tab)`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 hover:bg-teal-500/30 hover:border-teal-500/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-900"
                        >
                            <ExternalLink size={14} aria-hidden="true" />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

// ─── Uniform grid with equal-height rows ─────────────────────────────────────
// `grid-rows-[masonry]` isn't supported broadly yet, so we use auto-rows and
// rely on `h-full` on each card to stretch them to the tallest card in that row.
function ProjectGrid({ projects, label }) {
    return (
        <div
            /* auto-rows-fr is not standard, but grid-rows stretch via h-full on children */
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            role="list"
            aria-label={label}
        >
            {projects.map((project) => (
                <div key={project.title} role="listitem" className="flex">
                    <ProjectCard project={project} />
                </div>
            ))}
        </div>
    );
}

export function ProjectsSection() {
    const shouldReduceMotion = useReducedMotion();

    const featured = resumeData.projects.filter((p) => FEATURED_IDS.includes(p.title));
    const other    = resumeData.projects.filter((p) => !FEATURED_IDS.includes(p.title));

    return (
        // WCAG 1.3.1, 2.4.6 — id for skip-link targeting; aria-labelledby labels this landmark
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="py-24 px-4 relative bg-background"
        >
            {/* Decorative grid — hidden from AT */}
            <div
                className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Section header */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4 mb-16 text-center"
                >
                    <h2
                        id="projects-heading"
                        className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400"
                    >
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A selection of my recent work across AI/ML, full-stack, and automation.
                    </p>
                </motion.div>

                {/* Featured projects */}
                <ProjectGrid projects={featured} label="Featured projects" />

                {/* More projects */}
                {other.length > 0 && (
                    <>
                        <motion.h3
                            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="text-xl font-semibold text-neutral-300 mt-14 mb-6"
                        >
                            More Projects
                        </motion.h3>
                        <ProjectGrid projects={other} label="More projects" />
                    </>
                )}

                {/* CTA — view all on GitHub */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-center mt-14"
                >
                    <a
                        href="https://github.com/Ishan96Dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View all projects on GitHub (opens in new tab)"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700 text-neutral-300 font-medium text-sm hover:border-primary/50 hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        <Github size={16} aria-hidden="true" />
                        View All on GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
