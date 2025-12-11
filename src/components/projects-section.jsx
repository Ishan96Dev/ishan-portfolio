import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';

export function ProjectsSection() {
    return (
        <section id="projects" className="py-24 px-4 relative bg-background">
            {/* Background Noise/Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4 mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
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
