import { TubelightNavbar } from '@/components/ui/tubelight-navbar';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { ProjectsSection } from '@/components/projects-section';
import { GitHubActivitySection } from '@/components/github-activity-section';
import { ArchitectureSection } from '@/components/architecture-section';
import { CurrentlyExploringSection } from '@/components/currently-exploring-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/ui/footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
            {/* Skip navigation — first focusable element for keyboard users (WCAG 2.4.1) */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                Skip to main content
            </a>
            <TubelightNavbar />
            <main id="main-content">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ExperienceSection />
                <ProjectsSection />
                <GitHubActivitySection />
                <ArchitectureSection />
                <CurrentlyExploringSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
