import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';

export function ExperienceSection() {
    return (
        <section className="py-24 px-6 md:px-12 relative bg-neutral-950">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">Professional Experience</h2>
                    <p className="text-neutral-400 mt-4">My journey in the tech industry.</p>
                </motion.div>

                <div className="relative ml-4 md:ml-0 space-y-12">
                    {/* Continuous Line */}
                    <div className="absolute left-[9px] md:left-[9px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-teal-500/50 via-neutral-800 to-transparent" />

                    {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-8 md:ml-12 relative pl-10 md:pl-0">
                            <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className="absolute left-[4px] md:-left-[53px] top-6 w-3 h-3 rounded-full bg-teal-500 ring-4 ring-neutral-900 z-10"
                            />
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-teal-500/30 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                    <h3 className="text-xl font-bold text-neutral-200">{exp.role}</h3>
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        className="text-sm px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 w-fit mt-2 md:mt-0 shadow-[0_0_10px_rgba(20,184,166,0.1)]"
                                    >
                                        {exp.period}
                                    </motion.span>
                                </div>
                                <div className="text-lg text-neutral-400 mb-4 font-medium">{exp.company}</div>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300 cursor-default hover:bg-teal-500/20 hover:text-teal-400 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
