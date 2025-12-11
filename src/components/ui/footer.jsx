import { resumeData } from '@/data/resume';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl mt-20">
            <div className="container mx-auto px-6 py-12 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter text-foreground">
                            IC.
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Building robust AI systems and seamless digital experiences.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Navigation</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#hero" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>{resumeData.email}</li>
                            <li>{resumeData.phone}</li>
                            <li>{resumeData.location}</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Socials</h4>
                        <div className="flex gap-4">
                            {resumeData.social.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Ishan Chakraborty. All rights reserved.
                    </p>
                    <div className="text-xs text-muted-foreground">
                        Designed with React, Vite & Tailwind
                    </div>
                </div>
            </div>
        </footer>
    );
}
