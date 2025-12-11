import { motion } from 'framer-motion';

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 glass"
        >
            <div className="text-xl font-bold tracking-tighter text-foreground">
                IC.
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <a href="#about" className="hover:text-primary transition-colors">About</a>
                <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
                <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>

            <a
                href="mailto:ishan@example.com"
                className="px-4 py-2 text-sm font-medium text-background bg-foreground rounded-full hover:bg-white/90 transition-colors"
            >
                Let's Talk
            </a>
        </motion.nav>
    );
}
