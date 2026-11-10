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

    // Strip control characters and trim whitespace to prevent header injection
    const sanitizeField = (value) => value.replace(/[\r\n\t]/g, ' ').trim();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        const name = sanitizeField(formData.name);
        const email = sanitizeField(formData.email);
        const message = sanitizeField(formData.message);

        // Validate required fields
        if (!name || !email || !message) {
            setStatus({ type: "error", message: "Please fill in all fields." });
            setIsSubmitting(false);
            return;
        }

        // Enforce reasonable length limits
        if (name.length > 100) {
            setStatus({ type: "error", message: "Name must be 100 characters or fewer." });
            setIsSubmitting(false);
            return;
        }
        if (email.length > 254) {
            setStatus({ type: "error", message: "Email address is too long." });
            setIsSubmitting(false);
            return;
        }
        if (message.length > 2000) {
            setStatus({ type: "error", message: "Message must be 2000 characters or fewer." });
            setIsSubmitting(false);
            return;
        }

        // Validate email format (RFC 5321 practical subset)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setStatus({ type: "error", message: "Please enter a valid email address." });
            setIsSubmitting(false);
            return;
        }

        try {
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );
            const mailtoLink = `mailto:${resumeData.email}?subject=${subject}&body=${body}`;

            if (typeof window !== 'undefined') {
                window.location.href = mailtoLink;
            }

            setStatus({
                type: "success",
                message: "Opening your email client... If it doesn't open, please email me directly at " + resumeData.email
            });

            setTimeout(() => {
                setFormData({ name: "", email: "", message: "" });
                setStatus({ type: "", message: "" });
            }, 3000);

        } catch {
            setStatus({
                type: "error",
                message: "Something went wrong. Please email me directly at " + resumeData.email
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // WCAG 1.3.1, 2.4.6 — id for skip-link targeting; aria-labelledby labels this landmark
        <section id="contact" aria-labelledby="contact-heading" className="min-h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4 relative z-10">
                {/* WCAG 1.3.1, 2.4.6 — h2 (not h1; there is already one h1 in hero-section) */}
                <h2 id="contact-heading" className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400 text-center font-sans font-bold">
                    Get in Touch
                </h2>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Whether you have a question, a project idea, or just want to say hi, feel free to reach out. I&apos;m always open to discussing new opportunities and collaborations.
                </p>

                <div className="mt-12 w-full max-w-md mx-auto space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* WCAG 1.3.1, 3.3.2 — visible label via sr-only (placeholder still shown visually) */}
                        <div>
                            <label htmlFor="contact-name" className="sr-only">Your Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                maxLength={100}
                                autoComplete="name"
                                required
                                aria-required="true"
                                // suppressHydrationWarning covers auto-fill extensions that inject
                                // attributes into text inputs before React hydrates.
                                suppressHydrationWarning
                                className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="sr-only">Your Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                maxLength={254}
                                autoComplete="email"
                                required
                                aria-required="true"
                                // Browser extensions (e.g. password managers, temp-mail tools) inject
                                // extra attributes/styles into email inputs before React hydrates.
                                // suppressHydrationWarning prevents the false-positive mismatch error.
                                suppressHydrationWarning
                                className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="sr-only">Your Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows={4}
                                maxLength={2000}
                                required
                                aria-required="true"
                                className="w-full p-4 rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10 bg-neutral-950 placeholder:text-neutral-700 text-neutral-200 focus:outline-none resize-none"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* WCAG 4.1.3 — dynamic status announced immediately to screen readers.
                            role="alert" is used for errors (assertive); aria-live="polite" for success. */}
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                role={status.type === "error" ? "alert" : undefined}
                                aria-live={status.type === "success" ? "polite" : undefined}
                                aria-atomic="true"
                                className={`p-4 rounded-lg relative z-10 text-sm ${
                                    status.type === "success"
                                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                                }`}
                            >
                                {status.message}
                            </motion.div>
                        )}

                        {/* WCAG 2.4.7 — focus-visible ring on the submit button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full p-4 rounded-lg bg-teal-500 text-neutral-950 font-bold hover:bg-teal-400 transition-colors relative z-10 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                        >
                            {isSubmitting ? "Sending…" : "Send Message"}
                        </button>
                    </form>

                    {/* WCAG 1.1.1, 4.1.2 — social icon links have descriptive aria-label; icons are aria-hidden */}
                    <div className="flex justify-center gap-6 pt-8" role="list" aria-label="Social profiles">
                        {resumeData.social.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    role="listitem"
                                    aria-label={`${social.name} profile (opens in new tab)`}
                                    className="text-neutral-500 hover:text-teal-500 transition-colors z-10 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-950 rounded-sm"
                                >
                                    <Icon size={24} aria-hidden="true" />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* BackgroundBeams is decorative */}
            <BackgroundBeams />
        </section>
    );
}
