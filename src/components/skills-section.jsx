'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    Server, Globe, Brain, Database,
    TestTube2, Container, GitBranch, Archive, Wrench,
} from 'lucide-react';

// ─── Skill categories ──────────────────────────────────────────────────────────
const SKILL_CATEGORIES = [
    {
        id: 'backend',
        label: 'Backend',
        icon: Server,
        color: 'teal',
        description: 'Server-side development & REST API engineering',
        skills: [
            { name: 'Python',   level: 'Expert'        },
            { name: 'FastAPI',  level: 'Expert'        },
            { name: 'Flask',    level: 'Advanced'      },
            { name: 'Node.js',  level: 'Advanced'      },
        ],
    },
    {
        id: 'frontend',
        label: 'Frontend',
        icon: Globe,
        color: 'blue',
        description: 'Modern UI development & responsive design',
        skills: [
            { name: 'React.js',    level: 'Advanced' },
            { name: 'Next.js',     level: 'Advanced' },
            { name: 'JavaScript',  level: 'Advanced' },
            { name: 'HTML/CSS',    level: 'Advanced' },
        ],
    },
    {
        id: 'aiml',
        label: 'AI/ML',
        icon: Brain,
        color: 'purple',
        description: 'LLM integration, model training & inference',
        skills: [
            { name: 'OpenAI GPT',    level: 'Expert'  },
            { name: 'Google Gemini', level: 'Expert'  },
            { name: 'Claude',        level: 'Expert'  },
            { name: 'HuggingFace',   level: 'Advanced'},
        ],
    },
    {
        id: 'rag',
        label: 'RAG & Agents',
        icon: Database,
        color: 'orange',
        description: 'Retrieval-augmented generation & agentic workflows',
        skills: [
            { name: 'LangChain',   level: 'Expert'   },
            { name: 'LlamaIndex',  level: 'Advanced' },
            { name: 'CrewAI',      level: 'Advanced' },
            { name: 'NLP / NLU',   level: 'Advanced' },
        ],
    },
    {
        id: 'vectordb',
        label: 'Vector Databases',
        icon: Archive,
        color: 'emerald',
        description: 'High-dimensional vector storage & semantic search',
        skills: [
            { name: 'Milvus',    level: 'Advanced' },
            { name: 'ChromaDB',  level: 'Advanced' },
        ],
    },
    {
        id: 'qa',
        label: 'QA Automation',
        icon: TestTube2,
        color: 'rose',
        description: 'Test automation frameworks & performance testing',
        skills: [
            { name: 'Robot Framework', level: 'Expert'   },
            { name: 'Selenium',        level: 'Expert'   },
            { name: 'Playwright',      level: 'Advanced' },
            { name: 'Locust / JMeter', level: 'Advanced' },
        ],
    },
    {
        id: 'devops',
        label: 'DevOps',
        icon: Container,
        color: 'cyan',
        description: 'Containerisation, CI/CD pipelines, Linux server ops & deployments',
        skills: [
            { name: 'Docker',              level: 'Advanced'    },
            { name: 'GitHub Actions',      level: 'Advanced'    },
            { name: 'GitLab CI/CD',        level: 'Advanced'    },
            { name: 'Linux RHEL',          level: 'Advanced'    },
            { name: 'Linux Ubuntu',        level: 'Advanced'    },
            { name: 'On-Prem Deployment',  level: 'Advanced'    },
            { name: 'App Deployment',      level: 'Advanced'    },
            { name: 'Server Admin',        level: 'Intermediate'},
        ],
    },
    {
        id: 'db',
        label: 'Database',
        icon: GitBranch,
        color: 'amber',
        description: 'Relational, NoSQL & managed cloud database systems',
        skills: [
            { name: 'PostgreSQL', level: 'Advanced' },
            { name: 'MS SQL',     level: 'Advanced' },
            { name: 'Supabase',   level: 'Advanced' },
            { name: 'MongoDB',    level: 'Advanced' },
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        icon: Wrench,
        color: 'slate',
        description: 'Developer tooling, version control, editors & systems languages',
        skills: [
            { name: 'Git',         level: 'Expert'      },
            { name: 'Postman',     level: 'Expert'      },
            { name: 'VS Code',     level: 'Expert'      },
            { name: 'Linux',       level: 'Advanced'    },
            { name: 'Rust',        level: 'Beginner'    },
        ],
    },
];

// Colour-to-Tailwind mappings (Tailwind class generation must be static)
const COLOR_MAP = {
    teal:    { bg: 'bg-teal-500/10',    border: 'border-teal-500/30',    text: 'text-teal-400',    activeBg: 'bg-teal-500/20',   activeBorder: 'border-teal-500',    badge: 'bg-teal-500/20 text-teal-300'   },
    blue:    { bg: 'bg-blue-500/10',    border: 'border-blue-500/30',    text: 'text-blue-400',    activeBg: 'bg-blue-500/20',   activeBorder: 'border-blue-500',    badge: 'bg-blue-500/20 text-blue-300'   },
    purple:  { bg: 'bg-purple-500/10',  border: 'border-purple-500/30',  text: 'text-purple-400',  activeBg: 'bg-purple-500/20', activeBorder: 'border-purple-500',  badge: 'bg-purple-500/20 text-purple-300' },
    orange:  { bg: 'bg-orange-500/10',  border: 'border-orange-500/30',  text: 'text-orange-400',  activeBg: 'bg-orange-500/20', activeBorder: 'border-orange-500',  badge: 'bg-orange-500/20 text-orange-300' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', activeBg: 'bg-emerald-500/20',activeBorder: 'border-emerald-500', badge: 'bg-emerald-500/20 text-emerald-300'},
    rose:    { bg: 'bg-rose-500/10',    border: 'border-rose-500/30',    text: 'text-rose-400',    activeBg: 'bg-rose-500/20',   activeBorder: 'border-rose-500',    badge: 'bg-rose-500/20 text-rose-300'   },
    cyan:    { bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    text: 'text-cyan-400',    activeBg: 'bg-cyan-500/20',   activeBorder: 'border-cyan-500',    badge: 'bg-cyan-500/20 text-cyan-300'   },
    amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   text: 'text-amber-400',   activeBg: 'bg-amber-500/20',  activeBorder: 'border-amber-500',   badge: 'bg-amber-500/20 text-amber-300'  },
    slate:   { bg: 'bg-slate-500/10',   border: 'border-slate-500/30',   text: 'text-slate-400',   activeBg: 'bg-slate-500/20',  activeBorder: 'border-slate-500',   badge: 'bg-slate-500/20 text-slate-300'  },
};

// Experience-level labels (no arbitrary percentages)
const LEVEL_LABELS = {
    Expert:       { label: 'Expert',       dots: 4 },
    Advanced:     { label: 'Advanced',     dots: 3 },
    Intermediate: { label: 'Intermediate', dots: 2 },
    Beginner:     { label: 'Beginner',     dots: 1 },
};

function SkillLevelDots({ level, colorText }) {
    const { dots } = LEVEL_LABELS[level] ?? { dots: 2 };
    return (
        <span
            className="flex gap-0.5 items-center"
            role="img"
            aria-label={`Experience level: ${level}`}
        >
            {Array.from({ length: 4 }, (_, i) => (
                <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i < dots ? colorText.replace('text-', 'bg-') : 'bg-neutral-700'}`}
                />
            ))}
        </span>
    );
}

export function SkillsSection() {
    const shouldReduceMotion = useReducedMotion();
    const [activeId, setActiveId] = useState('backend');

    const active = SKILL_CATEGORIES.find((c) => c.id === activeId) ?? SKILL_CATEGORIES[0];
    const colors = COLOR_MAP[active.color];

    return (
        <section
            id="skills"
            aria-labelledby="skills-heading"
            className="py-24 px-6 md:px-12 relative bg-neutral-950 overflow-hidden"
        >
            {/* Decorative backgrounds */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2
                        id="skills-heading"
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400"
                    >
                        Technical Skills
                    </h2>
                    <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm">
                        Organised by domain. Select a category to explore the technologies.
                    </p>
                </motion.div>

                {/* Category tabs */}
                <div
                    className="flex flex-wrap justify-center gap-2 mb-10"
                    role="tablist"
                    aria-label="Skill categories"
                >
                    {SKILL_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const c = COLOR_MAP[cat.color];
                        const isActive = cat.id === activeId;
                        return (
                            <button
                                key={cat.id}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`skills-panel-${cat.id}`}
                                id={`skills-tab-${cat.id}`}
                                onClick={() => setActiveId(cat.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-950 ${
                                    isActive
                                        ? `${c.activeBg} ${c.activeBorder} ${c.text}`
                                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                                }`}
                            >
                                <Icon size={14} aria-hidden="true" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Active panel */}
                <motion.div
                    key={activeId}
                    role="tabpanel"
                    id={`skills-panel-${active.id}`}
                    aria-labelledby={`skills-tab-${active.id}`}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-8 rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} to-neutral-950`}
                >
                    <div className="flex items-start gap-4 mb-8">
                        {(() => {
                            const Icon = active.icon;
                            return <Icon size={28} className={colors.text} aria-hidden="true" />;
                        })()}
                        <div>
                            <h3 className={`text-xl font-bold ${colors.text}`}>{active.label}</h3>
                            <p className="text-neutral-400 text-sm mt-1">{active.description}</p>
                        </div>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label={`${active.label} technologies`}>
                        {active.skills.map((skill) => (
                            <motion.li
                                key={skill.name}
                                /* WCAG 2.3.3 — subtle lift only when motion is allowed */
                                whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.15 } }}
                                className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-600 transition-colors cursor-default"
                            >
                                <span className="text-neutral-200 font-medium text-sm">{skill.name}</span>
                                <div className="flex items-center gap-2">
                                    <SkillLevelDots level={skill.level} colorText={colors.text} />
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
                                        {skill.level}
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
