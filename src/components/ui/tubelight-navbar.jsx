import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, User, Briefcase, Mail, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TubelightNavbar() {
    const [activeTab, setActiveTab] = useState('Home')
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: 'Home', url: '#hero', icon: Home },
        { name: 'About', url: '#about', icon: User },
        { name: 'Projects', url: '#projects', icon: Briefcase },
        { name: 'Contact', url: '#contact', icon: Mail },
    ]

    return (
        <div className={cn(
            "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6 transition-all duration-300",
            isScrolled ? "pt-4" : "pt-6"
        )}>
            <div className="flex items-center gap-3 bg-background/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                {navItems.map((item) => {
                    const isActive = activeTab === item.name
                    const Icon = item.icon

                    return (
                        <a
                            key={item.name}
                            href={item.url}
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                                "text-white/80 hover:text-primary",
                                isActive && "bg-white/10 text-primary"
                            )}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden"><Icon size={18} /></span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
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
        </div>
    )
}
