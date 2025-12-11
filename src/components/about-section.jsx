import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';

export function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 md:px-12 relative bg-background/50">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">About Me</h2>
                        <div className="h-1 w-20 bg-primary rounded-full"></div>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            {resumeData.summary}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Skills */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold">Skills</h3>

                                <div className="space-y-6">
                                    {Object.entries(resumeData.customSkills).map(([category, skills], idx) => (
                                        <div key={idx}>
                                            <h4 className="text-sm text-muted-foreground mb-3 uppercase tracking-wider">{category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1.5 text-sm bg-primary/10 border border-primary/20 text-primary rounded-md cursor-default hover:bg-primary/20 hover:scale-105 transition-all duration-200"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Education, Certifications & Interests */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold">Education</h3>
                                {resumeData.education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="space-y-1 border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors"
                                    >
                                        <h4 className="font-medium text-lg">{edu.degree}</h4>
                                        <div className="text-sm text-muted-foreground">{edu.school}</div>
                                        <div className="text-xs text-muted-foreground">{edu.year}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold">Certifications</h3>
                                <ul className="space-y-2">
                                    {resumeData.certifications.map((cert, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + (index * 0.1) }}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span className="text-foreground font-medium">{cert.name}</span>
                                            <span className="opacity-50">- {cert.issuer}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.activities.map((activity, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-muted-foreground cursor-default hover:bg-white/10 hover:text-foreground transition-colors"
                                        >
                                            {activity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
