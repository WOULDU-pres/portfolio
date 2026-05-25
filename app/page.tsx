import { ActivityHeatmap } from "@/components/sections/activity-heatmap"
import { ActivityTimeline } from "@/components/sections/activity-timeline"
import { ContactCta } from "@/components/sections/contact-cta"
import { Hero } from "@/components/sections/hero"
import { LogoWall } from "@/components/sections/logo-wall"
import { Projects } from "@/components/sections/projects"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteNav } from "@/components/sections/site-nav"
import { StatBand } from "@/components/sections/stat-band"
import { Strengths } from "@/components/sections/strengths"

export default function Page() {
  return (
    <div className="min-h-svh scroll-smooth">
      <SiteNav />
      <main>
        <Hero />
        <StatBand />
        <LogoWall />
        <Strengths />
        <ActivityTimeline />
        <ActivityHeatmap />
        <Projects />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  )
}
