'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';

function ExperienceCard({ exp, index }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
            }}
            className="mb-8 md:ml-12 relative pl-10 md:pl-0"
        >
            {/* Timeline Dot - Vertically Centered */}
            <span className="absolute -left-[2px] md:-left-[50px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-500 ring-4 ring-neutral-900 z-10 flex items-center justify-center">
                {/* Continuous Pulsing Animation */}
                <motion.span
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full bg-teal-500"
                />
            </span>

            <motion.div
                whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-teal-500/30 transition-all duration-300 relative group"
            >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-primary rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
                
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-neutral-200">
                            {exp.role}
                        </h3>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="text-sm px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 w-fit mt-2 md:mt-0 shadow-[0_0_10px_rgba(20,184,166,0.1)]"
                        >
                            {exp.period}
                        </motion.span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        {/* Company Logo */}
                        {exp.logo ? (
                            <div className="relative w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ring-1 ring-neutral-700 p-1.5">
                                <Image src={exp.logo} alt={`${exp.company} logo`} fill className="object-contain p-1.5" sizes="48px" />
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-teal-400 font-bold text-sm flex-shrink-0">
                                {exp.company.charAt(0)}
                            </div>
                        )}
                        <div className="text-lg text-neutral-300 font-medium">{exp.company}</div>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300 cursor-pointer hover:bg-teal-500/20 hover:text-teal-400 hover:scale-110 transition-all duration-200 ease-out"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function ExperienceSection() {
    return (
        <section className="py-24 px-6 md:px-12 relative bg-neutral-950 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
                
                {/* Static Glow Effects */}
                <div className="absolute left-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-teal-500/20 opacity-20 blur-[100px]" />
                <div className="absolute right-0 bottom-0 -z-10 m-auto h-[250px] w-[250px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
                        Professional Experience
                    </h2>
                    <p className="text-neutral-400 mt-4">
                        My journey in the tech industry.
                    </p>
                </motion.div>

                <div className="relative ml-4 md:ml-0 space-y-12">
                    {/* Static Timeline Line */}
                    <div className="absolute left-[4px] md:left-[4px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-teal-500/50 via-neutral-800 to-transparent" />

                    {resumeData.experience.map((exp, index) => (
                        <ExperienceCard key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
