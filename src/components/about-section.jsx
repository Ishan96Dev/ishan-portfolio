'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
    Cpu, Layers, Braces, TrendingUp,
    Server, Globe, Brain, Database, TestTube2,
    Container, GitBranch, Sparkles, BookOpen,
    Award,
} from 'lucide-react';
import { resumeData } from '@/data/resume';

// ─── Stat cards ──────────────────────────────────────────────────────────────
const STATS = [
    { label: 'Industry Experience', value: '4+', unit: 'Years', icon: TrendingUp, color: 'from-teal-500/20 to-teal-500/5', border: 'border-teal-500/30', text: 'text-teal-400' },
    { label: 'Featured Projects',   value: '10+', unit: 'Built',  icon: Layers,     color: 'from-blue-500/20 to-blue-500/5',  border: 'border-blue-500/30',  text: 'text-blue-400'  },
    { label: 'Technical Domains',   value: '5+',  unit: 'Areas',  icon: Cpu,        color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400' },
    { label: 'Core Technologies',   value: '20+', unit: 'Tools',  icon: Braces,     color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30', text: 'text-orange-400' },
];

// ─── Professional focus areas ─────────────────────────────────────────────────
const FOCUS_AREAS = [
    { label: 'Backend Engineering',  icon: Server },
    { label: 'AI/ML Development',    icon: Brain },
    { label: 'Generative AI',        icon: Sparkles },
    { label: 'RAG Architecture',     icon: Database },
    { label: 'API Development',      icon: Globe },
    { label: 'CI/CD Automation',     icon: GitBranch },
    { label: 'Cloud & DevOps',       icon: Container },
    { label: 'QA Automation',        icon: TestTube2 },
];

export function AboutSection() {
    // WCAG 2.3.3 — skip entrance animations when user prefers reduced motion
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="py-24 px-6 md:px-12 relative bg-background/50 overflow-hidden"
        >
            {/* Decorative backgrounds — hidden from AT */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Section header */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2
                        id="about-heading"
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400"
                    >
                        About Me
                    </h2>
                    <div className="h-1 w-20 bg-primary rounded-full mx-auto mt-4" aria-hidden="true" />
                </motion.div>

                {/* ── Stat cards ── */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                    role="list"
                    aria-label="Career statistics"
                >
                    {STATS.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                role="listitem"
                                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
                                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                                /* WCAG 2.3.3 — lift only when motion is allowed */
                                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.04, transition: { duration: 0.2 } }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                                className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} text-center group cursor-default`}
                            >
                                <Icon
                                    size={24}
                                    className={`${stat.text} mx-auto mb-3`}
                                    aria-hidden="true"
                                />
                                <p className={`text-3xl font-bold ${stat.text}`}>{stat.value}</p>
                                <p className="text-xs text-neutral-400 mt-1">{stat.unit}</p>
                                <p className="text-xs text-neutral-300 font-medium mt-2 leading-tight">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Professional summary ── */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 mb-12"
                >
                    <h3 className="text-xl font-semibold text-neutral-200 mb-4">Professional Summary</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                        {resumeData.summary}
                    </p>
                </motion.div>

                {/* ── Focus areas ── */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mb-16"
                >
                    <h3 className="text-xl font-semibold text-neutral-200 mb-6 text-center">Core Domains</h3>
                    <ul
                        className="flex flex-wrap justify-center gap-3"
                        aria-label="Core engineering domains"
                    >
                        {FOCUS_AREAS.map((area) => {
                            const Icon = area.icon;
                            return (
                                <motion.li
                                    key={area.label}
                                    whileHover={shouldReduceMotion ? undefined : { scale: 1.06, transition: { duration: 0.15 } }}
                                >
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 text-sm hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default">
                                        <Icon size={14} aria-hidden="true" />
                                        {area.label}
                                    </span>
                                </motion.li>
                            );
                        })}
                    </ul>
                </motion.div>

                {/* ── Education, Certifications & Interests ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Education */}
                    <motion.div
                        initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <BookOpen size={18} className="text-primary" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-neutral-200">Education</h3>
                        </div>
                        <ul className="space-y-4">
                            {resumeData.education.map((edu, index) => (
                                <li
                                    key={index}
                                    className="border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors"
                                >
                                    <p className="font-medium text-sm text-neutral-200">{edu.degree}</p>
                                    <p className="text-xs text-neutral-400 mt-0.5">{edu.school}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">{edu.year}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <Award size={18} className="text-teal-400" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-neutral-200">Certifications</h3>
                        </div>
                        <ul className="space-y-3">
                            {resumeData.certifications.map((cert, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span
                                        className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span>
                                        <span className="text-neutral-200 font-medium">{cert.name}</span>
                                        <span className="text-neutral-500 text-xs"> — {cert.issuer}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Interests */}
                    <motion.div
                        initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <Sparkles size={18} className="text-purple-400" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-neutral-200">Interests</h3>
                        </div>
                        <ul className="flex flex-wrap gap-2" aria-label="Personal interests">
                            {resumeData.activities.map((activity, index) => (
                                <li key={index}>
                                    <span className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-neutral-400 cursor-default hover:bg-white/10 hover:text-neutral-200 transition-colors">
                                        {activity}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
