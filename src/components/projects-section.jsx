'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';

export function ProjectsSection() {
    // WCAG 2.3.3 — respect OS reduced-motion preference for entrance animation
    const shouldReduceMotion = useReducedMotion()

    return (
        // WCAG 1.3.1, 2.4.6 — id for skip-link targeting; aria-labelledby labels the landmark
        <section id="projects" aria-labelledby="projects-heading" className="py-24 px-4 relative bg-background">
            {/* Decorative grid — hidden from AT */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4 mb-16 text-center"
                >
                    <h2 id="projects-heading" className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A collection of my recent work, showcasing my skills in full-stack development and design.
                    </p>
                </motion.div>

                <BentoGrid>
                    {resumeData.projects.map((project, index) => (
                        <BentoGridItem
                            key={index}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            className={index === 0 || index === 3 ? "md:col-span-2" : ""}
                            link={project.link}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
