import CarouselStacked from "@/components/ui/carousel-07"
import { projects } from "@/lib/data"

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-6">
        <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
          Projects
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          프로젝트 개발 · 연구
        </h2>
      </div>
      <CarouselStacked
        slides={projects.map((project) => ({
          image: project.image,
          title: project.title,
          badge: project.org,
          period: project.period,
          award: project.award,
        }))}
      />
    </section>
  )
}
