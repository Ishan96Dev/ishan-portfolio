'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { BackgroundBeams } from "./ui/background-beams";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: "error", message: "Please fill in all fields" });
            setIsSubmitting(false);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: "error", message: "Please enter a valid email address" });
            setIsSubmitting(false);
            return;
        }

        try {
            // Create mailto link with form data
            const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            );
            const mailtoLink = `mailto:${resumeData.email}?subject=${subject}&body=${body}`;
            
            // Open email client (guard for SSR)
            if (typeof window !== 'undefined') {
                window.location.href = mailtoLink;
            }
            
            // Show success message
            setStatus({ 
                type: "success", 
                message: "Opening your email client... If it doesn't open, please email me directly at " + resumeData.email 
            });
            
            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({ name: "", email: "", message: "" });
                setStatus({ type: "", message: "" });
            }, 3000);
            
        } catch (error) {
            setStatus({ 
                type: "error", 
                message: "Something went wrong. Please email me directly at " + resumeData.email 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none"
                            disabled={isSubmitting}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none"
                            disabled={isSubmitting}
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows={4}
                            className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none resize-none"
                            disabled={isSubmitting}
                        />
                        
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-lg relative z-10 text-sm ${
                                    status.type === "success" 
                                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
                                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                                }`}
                            >
                                {status.message}
                            </motion.div>
                        )}

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full p-4 rounded-lg bg-teal-500 text-neutral-950 font-bold hover:bg-teal-400 transition-colors relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
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
