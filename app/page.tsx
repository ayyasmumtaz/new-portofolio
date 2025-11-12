import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import Projects from "@/components/sections/projects"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import Contact from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="w-full bg-background relative overflow-hidden">
      <Navigation />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
