'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Cpu, BrainCircuit } from 'lucide-react';

// ─── Technologies I'm learning ───────────────────────────────────────────────
const TECHNOLOGIES = [
    {
        area: 'AI Agents',
        detail: 'Agents capable of executing multi-step workflows autonomously — planning, tool use, and goal-directed execution without human hand-holding.',
        badge: 'Agentic AI',
        color: 'teal',
    },
    {
        area: 'Muse Ember',
        detail: "Meta's new efficient model optimised for coding and agent workloads — exploring its performance characteristics and integration patterns.",
        badge: 'LLM',
        color: 'purple',
    },
    {
        area: 'Seedream 5.5',
        detail: 'New AI image-generation model with improved prompt adherence, photorealism, and creative control over visual outputs.',
        badge: 'Image Gen',
        color: 'rose',
    },
    {
        area: 'MCP',
        detail: 'Model Context Protocol — a standard for connecting AI models with external applications and tools, enabling secure, structured tool use.',
        badge: 'Protocol',
        color: 'blue',
    },
    {
        area: 'Browser Agents',
        detail: 'AI systems that navigate websites, fill forms, extract data, and perform complex tasks autonomously in a live browser environment.',
        badge: 'Agents',
        color: 'cyan',
    },
    {
        area: 'AI Coding',
        detail: 'More capable autonomous coding agents that plan, write, test, and refactor code end-to-end — exploring agentic IDE integrations.',
        badge: 'AI Dev',
        color: 'emerald',
    },
    {
        area: 'Multimodal AI',
        detail: 'Models that jointly understand and generate text, images, audio, and video — enabling richer, context-aware AI interactions.',
        badge: 'Multimodal',
        color: 'orange',
    },
    {
        area: 'Enterprise AI',
        detail: 'Integrating AI agents into business workflows — procurement, HR, finance, and ops — with security, auditability, and reliability constraints.',
        badge: 'Enterprise',
        color: 'amber',
    },
    {
        area: 'Linux RHEL & Ubuntu',
        detail: 'Deepening hands-on Linux administration across enterprise RHEL and Ubuntu — package management, systemd services, firewall rules, and performance tuning.',
        badge: 'Linux',
        color: 'slate',
    },
    {
        area: 'Rust',
        detail: "Exploring Rust's ownership model and memory-safe concurrency for high-throughput data processing workloads — building CLI tools and system utilities.",
        badge: 'Systems',
        color: 'rose',
    },
    {
        area: 'On-Prem Server Deployment',
        detail: 'Learning to deploy and manage applications on bare-metal and on-premises servers — provisioning, networking, reverse proxies (Nginx), and service hardening.',
        badge: 'Infra',
        color: 'teal',
    },
    {
        area: 'App Deployment Strategies',
        detail: 'Exploring blue-green deployments, canary releases, and rollback strategies for zero-downtime production deployments of web and AI services.',
        badge: 'DevOps',
        color: 'blue',
    },
];

// ─── Emerging AI Concepts ─────────────────────────────────────────────────────
const CONCEPTS = [
    {
        name: 'Agentic AI',
        meaning: 'AI that independently plans and executes tasks without step-by-step human instruction.',
        color: 'teal',
    },
    {
        name: 'Recursive AI',
        meaning: 'AI that repeatedly improves or refines its own outputs in an iterative loop.',
        color: 'blue',
    },
    {
        name: 'Looping Agents',
        meaning: 'Agents that repeat actions or reasoning cycles until a defined goal is reached.',
        color: 'purple',
    },
    {
        name: 'Harvesting AI',
        meaning: 'Collecting useful information, signals, or experiences to improve AI systems over time.',
        color: 'orange',
    },
    {
        name: 'World Models',
        meaning: 'AI systems that learn an internal model of how the physical world behaves to plan actions.',
        color: 'cyan',
    },
    {
        name: 'Self-Evolving AI',
        meaning: 'AI that adapts its own strategies and representations based on accumulated experience.',
        color: 'emerald',
    },
    {
        name: 'Swarm Intelligence',
        meaning: 'Multiple AI agents collaborating like a swarm — each simple, but collectively powerful.',
        color: 'rose',
    },
    {
        name: 'Ambient AI',
        meaning: 'AI that works continuously in the background, quietly performing tasks without explicit invocation.',
        color: 'amber',
    },
    {
        name: 'Embodied AI',
        meaning: 'AI integrated into robots and physical environments, learning by interacting with the real world.',
        color: 'teal',
    },
    {
        name: 'Liquid Neural Networks',
        meaning: 'Neural networks designed to adapt their computations dynamically over time, not just at training.',
        color: 'blue',
    },
    {
        name: 'Synthetic Data',
        meaning: 'AI-generated training data used to train other AI models — reducing reliance on real-world labelling.',
        color: 'purple',
    },
    {
        name: 'Test-Time Training',
        meaning: 'Models that adapt during inference rather than relying exclusively on knowledge from prior training.',
        color: 'orange',
    },
    {
        name: 'Neuro-Symbolic AI',
        meaning: 'Combining neural network pattern-matching with symbolic logic and reasoning for explainability.',
        color: 'cyan',
    },
    {
        name: 'Recursive Self-Improvement',
        meaning: 'Systems attempting to iteratively improve their own capabilities — a key concept in AI safety research.',
        color: 'rose',
    },
];

// ─── Colour tokens (static Tailwind classes) ──────────────────────────────────
const COLOR_BORDER = {
    teal:    'border-teal-500/30',
    blue:    'border-blue-500/30',
    purple:  'border-purple-500/30',
    orange:  'border-orange-500/30',
    cyan:    'border-cyan-500/30',
    emerald: 'border-emerald-500/30',
    rose:    'border-rose-500/30',
    amber:   'border-amber-500/30',
};

const COLOR_BADGE = {
    teal:    'bg-teal-500/10 border-teal-500/30 text-teal-400',
    blue:    'bg-blue-500/10 border-blue-500/30 text-blue-400',
    purple:  'bg-purple-500/10 border-purple-500/30 text-purple-400',
    orange:  'bg-orange-500/10 border-orange-500/30 text-orange-400',
    cyan:    'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    rose:    'bg-rose-500/10 border-rose-500/30 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/30 text-amber-400',
};

const COLOR_DOT = {
    teal:    'bg-teal-400',
    blue:    'bg-blue-400',
    purple:  'bg-purple-400',
    orange:  'bg-orange-400',
    cyan:    'bg-cyan-400',
    emerald: 'bg-emerald-400',
    rose:    'bg-rose-400',
    amber:   'bg-amber-400',
};

const COLOR_HOVER_BORDER = {
    teal:    'hover:border-teal-500/50',
    blue:    'hover:border-blue-500/50',
    purple:  'hover:border-purple-500/50',
    orange:  'hover:border-orange-500/50',
    cyan:    'hover:border-cyan-500/50',
    emerald: 'hover:border-emerald-500/50',
    rose:    'hover:border-rose-500/50',
    amber:   'hover:border-amber-500/50',
};

// ─── Tech card ────────────────────────────────────────────────────────────────
function TechCard({ item, index, shouldReduceMotion }) {
    return (
        <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            /* WCAG 2.3.3 — whileHover animation only fires when motion is allowed */
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.06 }}
            className={`group flex flex-col h-full p-6 rounded-2xl bg-neutral-900/60 border ${COLOR_BORDER[item.color]} ${COLOR_HOVER_BORDER[item.color]} transition-colors duration-200 cursor-default`}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-neutral-100 text-sm leading-snug">{item.area}</h3>
                <span
                    className={`text-xs px-2.5 py-0.5 rounded-full border flex-shrink-0 ${COLOR_BADGE[item.color]}`}
                >
                    {item.badge}
                </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed flex-1">{item.detail}</p>
        </motion.div>
    );
}

// ─── Concept card ─────────────────────────────────────────────────────────────
function ConceptCard({ item, index, shouldReduceMotion }) {
    return (
        <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            /* WCAG 2.3.3 — whileHover animation only when motion is allowed */
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.04 }}
            className={`group flex flex-col h-full p-5 rounded-2xl bg-neutral-900/60 border ${COLOR_BORDER[item.color]} ${COLOR_HOVER_BORDER[item.color]} transition-colors duration-200 cursor-default`}
        >
            <div className="flex items-center gap-2 mb-2">
                {/* Decorative colour dot — hidden from AT */}
                <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${COLOR_DOT[item.color]}`}
                    aria-hidden="true"
                />
                <h3 className="font-semibold text-neutral-100 text-sm">{item.name}</h3>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">{item.meaning}</p>
        </motion.div>
    );
}

export function CurrentlyExploringSection() {
    const shouldReduceMotion = useReducedMotion();
    const [activeTab, setActiveTab] = useState('technologies');

    return (
        <section
            id="exploring"
            aria-labelledby="exploring-heading"
            className="py-24 px-6 md:px-12 relative bg-neutral-950 overflow-hidden"
        >
            {/* Decorative background — hidden from AT */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-teal-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                        <Zap size={12} aria-hidden="true" />
                        Currently Exploring
                    </div>
                    <h2
                        id="exploring-heading"
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400"
                    >
                        What I&apos;m Learning Now
                    </h2>
                    <p className="text-neutral-400 mt-4 text-sm max-w-xl mx-auto">
                        Technologies I&apos;m actively building with, plus emerging AI concepts I&apos;m tracking.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div
                    className="flex justify-center gap-3 mb-10"
                    role="tablist"
                    aria-label="Exploration categories"
                >
                    <button
                        role="tab"
                        id="tab-technologies"
                        aria-selected={activeTab === 'technologies'}
                        aria-controls="panel-technologies"
                        onClick={() => setActiveTab('technologies')}
                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-950 ${
                            activeTab === 'technologies'
                                ? 'bg-primary/20 border-primary text-primary'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                        }`}
                    >
                        <Cpu size={14} aria-hidden="true" />
                        Technologies
                    </button>
                    <button
                        role="tab"
                        id="tab-concepts"
                        aria-selected={activeTab === 'concepts'}
                        aria-controls="panel-concepts"
                        onClick={() => setActiveTab('concepts')}
                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-950 ${
                            activeTab === 'concepts'
                                ? 'bg-primary/20 border-primary text-primary'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                        }`}
                    >
                        <BrainCircuit size={14} aria-hidden="true" />
                        AI Concepts
                    </button>
                </div>

                {/* Technologies panel */}
                {activeTab === 'technologies' && (
                    <motion.div
                        key="technologies"
                        id="panel-technologies"
                        role="tabpanel"
                        aria-labelledby="tab-technologies"
                        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
                            role="list"
                            aria-label="Technologies I am learning"
                        >
                            {TECHNOLOGIES.map((item, i) => (
                                <div key={item.area} role="listitem" className="flex">
                                    <TechCard item={item} index={i} shouldReduceMotion={shouldReduceMotion} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Concepts panel */}
                {activeTab === 'concepts' && (
                    <motion.div
                        key="concepts"
                        id="panel-concepts"
                        role="tabpanel"
                        aria-labelledby="tab-concepts"
                        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                            role="list"
                            aria-label="Emerging AI concepts I am tracking"
                        >
                            {CONCEPTS.map((item, i) => (
                                <div key={item.name} role="listitem" className="flex">
                                    <ConceptCard item={item} index={i} shouldReduceMotion={shouldReduceMotion} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
