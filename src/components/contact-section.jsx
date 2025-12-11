import React from "react";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { BackgroundBeams } from "./ui/background-beams";

export function ContactSection() {
    return (
        <section id="contact" className="min-h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4 relative z-10">
                <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                    Get in Touch
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Whether you have a question, a project idea, or just want to say hi, feel free to reach out. I'm always open to discussing new opportunities and collaborations.
                </p>

                <div className="mt-12 w-full max-w-md mx-auto space-y-4">
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={4}
                            className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none"
                        />
                        <button className="w-full p-4 rounded-lg bg-teal-500 text-neutral-950 font-bold hover:bg-teal-400 transition-colors relative z-10">
                            Send Message
                        </button>
                    </form>

                    <div className="flex justify-center gap-6 pt-8">
                        {resumeData.social.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a key={index} href={social.url} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-teal-500 transition-colors z-10 relative">
                                    <Icon size={24} />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
            <BackgroundBeams />
        </section>
    );
}
