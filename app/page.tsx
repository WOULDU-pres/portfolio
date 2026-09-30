import { ActivityTimeline } from "@/components/sections/activity-timeline"
import { EducationFilterProvider } from "@/components/sections/education-filter"
import { EducationPrograms } from "@/components/sections/education-programs"
import { Hero } from "@/components/sections/hero"
import { LogoWall } from "@/components/sections/logo-wall"
import { Projects } from "@/components/sections/projects"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteNav } from "@/components/sections/site-nav"

export default function Page() {
  return (
    <div className="min-h-svh scroll-smooth">
      <SiteNav />
      <main>
        <Hero />
        <EducationFilterProvider>
          <EducationPrograms />
          <ActivityTimeline />
        </EducationFilterProvider>
        <Projects />
        <LogoWall />
      </main>
      <SiteFooter />
    </div>
  )
}
