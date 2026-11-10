'use client';

import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, User, Briefcase, Mail, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TubelightNavbar() {
    const [activeTab, setActiveTab] = useState('Home')
    const [isScrolled, setIsScrolled] = useState(false)
    // Respect OS-level reduced-motion preference (WCAG 2.3.3)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: 'Home',       url: '#hero',         icon: Home      },
        { name: 'About',      url: '#about',         icon: User      },
        { name: 'Skills',     url: '#skills',        icon: Link      },
        { name: 'Experience', url: '#experience',    icon: Briefcase },
        { name: 'Projects',   url: '#projects',      icon: Link      },
        { name: 'Contact',    url: '#contact',       icon: Mail      },
    ]

    return (
        // WCAG 1.3.1, 2.4.6 — explicit nav landmark with descriptive label
        <nav
            aria-label="Main navigation"
            className={cn(
                "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6 transition-all duration-300",
                isScrolled ? "pt-4" : "pt-6"
            )}
        >
            <div className="flex items-center gap-3 bg-background/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                {navItems.map((item) => {
                    const isActive = activeTab === item.name
                    const Icon = item.icon

                    return (
                        <a
                            key={item.name}
                            href={item.url}
                            onClick={() => setActiveTab(item.name)}
                            // WCAG 4.1.2 — communicate active page to assistive technology
                            aria-current={isActive ? 'page' : undefined}
                            // WCAG 1.1.1, 4.1.2 — accessible name for icon-only mobile state
                            aria-label={item.name}
                            className={cn(
                                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                                "text-white/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                                isActive && "bg-white/10 text-primary"
                            )}
                        >
                            {/* Visible text on desktop */}
                            <span className="hidden md:inline" aria-hidden="true">{item.name}</span>
                            {/* Icon on mobile — decorative since aria-label on <a> provides the name */}
                            <span className="md:hidden" aria-hidden="true"><Icon size={18} /></span>

                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                    // WCAG 2.3.3 — disable spring if user prefers reduced motion
                                    transition={
                                        shouldReduceMotion
                                            ? { duration: 0 }
                                            : { type: 'spring', stiffness: 300, damping: 30 }
                                    }
                                    aria-hidden="true"
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full" aria-hidden="true">
                                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </a>
                    )
                })}
            </div>
        </nav>
    )
}
