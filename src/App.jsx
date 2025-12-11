import { TubelightNavbar } from "@/components/ui/tubelight-navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/ui/footer"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <TubelightNavbar />
      <HeroSection />

      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />

      <Footer />
    </div>
  )
}


export default App
