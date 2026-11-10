'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { TextScramble } from './ui/text-scramble';
import { SparklesText } from './ui/sparkles-text';
import profileImg from '@/assets/profile.jpg';
import { resumeData } from '@/data/resume';

export function HeroSection() {
    // WCAG 2.3.3 — respect OS reduced-motion preference
    const shouldReduceMotion = useReducedMotion()

    // If reduced motion is preferred, skip translate/opacity entrance animations
    const fadeInUp = shouldReduceMotion
        ? {}
        : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

    const fadeIn = shouldReduceMotion
        ? {}
        : { initial: { opacity: 0 }, animate: { opacity: 1 } }

    const slideUp = shouldReduceMotion
        ? {}
        : { initial: { y: '100%' }, animate: { y: 0 } }

    const scaleIn = shouldReduceMotion
        ? {}
        : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }

    return (
        <section id="hero" aria-labelledby="hero-name" className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 overflow-hidden relative">
            {/* Decorative background — hidden from AT */}
            <div className="absolute inset-0 bg-background" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="space-y-8 z-10 order-2 lg:order-1">
                    <motion.div
                        {...fadeInUp}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary"
                    >
                        {/* WCAG 2.3.3 — motion-safe:animate-ping stops ping for reduced-motion users */}
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Available for new projects
                    </motion.div>

                    <div className="space-y-2">
                        {/* WCAG 1.3.1 — single h1 for the page; id used by aria-labelledby on section */}
                        <h1 id="hero-name" className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                            <div className="overflow-hidden">
                                <motion.div
                                    {...slideUp}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* WCAG 1.3.1 — TextScramble hides random chars from AT via aria-hidden;
                                        the outer span with aria-label exposes the final readable text */}
                                    <TextScramble className="block text-foreground">ISHAN</TextScramble>
                                </motion.div>
                            </div>
                            <div className="overflow-hidden">
                                <motion.div
                                    {...slideUp}
                                    transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="block text-muted-foreground">CHAKRABORTY</span>
                                </motion.div>
                            </div>
                        </h1>
                        <motion.div
                            {...fadeIn}
                            transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
                            className="text-xl text-muted-foreground max-w-lg mt-4"
                        >
                            <SparklesText text={resumeData.title} />
                            <br />
                            <span className="text-base opacity-80">{resumeData.subtitle}</span>
                        </motion.div>
                    </div>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
                        className="flex items-center gap-4"
                    >
                        {resumeData.social.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // WCAG 1.1.1, 4.1.2 — descriptive accessible name for icon-only link
                                    aria-label={`${social.name} profile (opens in new tab)`}
                                    className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                                >
                                    {/* WCAG 1.1.1 — icon is decorative; label is on the <a> */}
                                    <Icon size={20} aria-hidden="true" />
                                </a>
                            )
                        })}
                    </motion.div>
                </div>

                {/* Right Image */}
                <motion.div
                    {...scaleIn}
                    transition={{ duration: 1, delay: shouldReduceMotion ? 0 : 0.2 }}
                    className="relative lg:h-[600px] flex justify-center lg:justify-end order-1 lg:order-2"
                >
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" aria-hidden="true"></div>
                        <Image
                            src={profileImg}
                            alt="Ishan Chakraborty — profile photo"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                            sizes="(max-width: 768px) 100vw, 448px"
                            priority
                        />
                        {/* Decorative glow — hidden from AT */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" aria-hidden="true"></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
