'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { resumeData } from '@/data/resume';

// Per-experience achievements (using only factual information from the resume)
const ACHIEVEMENTS = {
    'Metropolitan Stock Exchange of India (MSE)': [
        'Developed and maintains live exchange platform serving real-time trading data',
        'Built REST APIs in Node.js and Python powering the official MSE website',
        'Manages full-stack development across both frontend (Next.js) and backend layers',
        'Administers Linux servers and MS SQL database supporting market data systems',
    ],
    'Metropolitan Stock Exchange of India (MSEI)': [
        'Architected Python backend service for real-time SX40 Index and Forex ticker data',
        'Developed animated LED Ticker UI integrated with Next.js live data pipeline',
        'Engineered real-time financial data pipelines for equity, currency derivatives and debt markets',
    ],
    'Katonic.ai (QA)': [
        'Executed specialised LLM and Generative AI system testing at scale',
        'Built Robot Framework automation suites deployed via Docker containers',
        'Validated RAG pipeline performance and Agentic AI workflow correctness',
        'Drove API and performance testing using Postman, Locust, and JMeter',
    ],
    'Katonic.ai (DS)': [
        'Deployed production-ready ML applications using Streamlit for end-user access',
        'Built Sentiment Analyzer and Mask Detection computer-vision applications',
        'Contributed to quality assurance of Katonic MLOps and GenAI Platform',
        'Developed NLP models and computer vision solutions for real business problems',
    ],
    'Sectona': [
        'Tested security-critical UI components for Privileged Access Management (PAM) software',
        'Validated UI compatibility across Linux and Windows environments',
        'Documented test cases and reported defects via bug tracking tools',
    ],
};

// Derive a stable key per experience entry
function expKey(exp) {
    if (exp.company.includes('MSE') && exp.role.includes('Sr.')) return 'Metropolitan Stock Exchange of India (MSE)';
    if (exp.company.includes('MSEI') || (exp.company.includes('MSE') && exp.role.includes('Freelance'))) return 'Metropolitan Stock Exchange of India (MSEI)';
    if (exp.company.includes('Katonic') && exp.role.includes('QA')) return 'Katonic.ai (QA)';
    if (exp.company.includes('Katonic') && exp.role.includes('Data')) return 'Katonic.ai (DS)';
    return exp.company;
}

function ExperienceCard({ exp, index }) {
    const shouldReduceMotion = useReducedMotion();
    const achievements = ACHIEVEMENTS[expKey(exp)] ?? [];

    return (
        <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 50 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1, ease: 'easeOut' }}
            className="mb-10 md:ml-12 relative pl-10 md:pl-0"
        >
            {/* Timeline dot — decorative, hidden from AT */}
            <span
                className="absolute -left-[2px] md:-left-[50px] top-8 w-3 h-3 rounded-full bg-teal-500 ring-4 ring-neutral-900 z-10 flex items-center justify-center"
                aria-hidden="true"
            >
                <span className="absolute inset-0 rounded-full bg-teal-500 motion-safe:animate-ping opacity-50" />
            </span>

            <motion.article
                whileHover={shouldReduceMotion ? undefined : { scale: 1.015, transition: { duration: 0.2 } }}
                className="p-6 md:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-teal-500/30 transition-all duration-300 relative group"
                aria-label={`${exp.role} at ${exp.company}`}
            >
                {/* Decorative hover glow — hidden from AT */}
                <div
                    className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-primary rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"
                    aria-hidden="true"
                />

                <div className="relative">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                        <div className="flex items-center gap-4">
                            {/* Company logo */}
                            {exp.logo ? (
                                <div className="relative w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 ring-1 ring-neutral-700 p-2">
                                    <Image
                                        src={exp.logo}
                                        alt={`${exp.company} logo`}
                                        fill
                                        className="object-contain p-2"
                                        sizes="56px"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="w-14 h-14 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-teal-400 font-bold text-lg flex-shrink-0"
                                    role="img"
                                    aria-label={`${exp.company} logo`}
                                >
                                    {exp.company.charAt(0)}
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-neutral-100">{exp.role}</h3>
                                <p className="text-sm text-neutral-400 font-medium mt-0.5">{exp.company}</p>
                            </div>
                        </div>

                        {/* Period badge */}
                        <span className="text-xs px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 self-start whitespace-nowrap shadow-[0_0_10px_rgba(20,184,166,0.1)]">
                            <time>{exp.period}</time>
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-400 text-sm leading-relaxed mb-5">{exp.description}</p>

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <div className="mb-5">
                            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                                Key Contributions
                            </h4>
                            <ul className="space-y-2" aria-label={`Key contributions at ${exp.company}`}>
                                {achievements.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-500 flex-shrink-0" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tech tags */}
                    <ul
                        className="flex flex-wrap gap-2"
                        aria-label={`Technologies used at ${exp.company}`}
                    >
                        {exp.tags.map((tag, i) => (
                            <li
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-teal-500/20 hover:text-teal-400 hover:border-teal-500/30 transition-colors duration-200"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.article>
        </motion.div>
    );
}

export function ExperienceSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        // WCAG 1.3.1, 2.4.6 — id for skip link targeting; aria-labelledby labels this landmark
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className="py-24 px-6 md:px-12 relative bg-neutral-950 overflow-hidden"
        >
            {/* Decorative background elements — hidden from AT */}
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
                <div className="absolute left-0 top-0 h-[310px] w-[310px] rounded-full bg-teal-500/20 opacity-20 blur-[100px]" />
                <div className="absolute right-0 bottom-0 h-[250px] w-[250px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2
                        id="experience-heading"
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400"
                    >
                        Professional Experience
                    </h2>
                    <p className="text-neutral-400 mt-4">
                        A timeline of my career in technology.
                    </p>
                </motion.div>

                <div className="relative ml-4 md:ml-0 space-y-6">
                    {/* Timeline line — decorative */}
                    <div
                        className="absolute left-[4px] md:left-[4px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-teal-500/60 via-neutral-800 to-transparent"
                        aria-hidden="true"
                    />

                    {resumeData.experience.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
