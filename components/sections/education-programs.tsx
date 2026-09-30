import { EducationGallery } from "@/components/sections/education-gallery"
import { educationPrograms } from "@/lib/data"

const items = educationPrograms.map((program) => ({
  id: program.id,
  title: program.title,
  label: program.label,
  desc: program.desc,
  image: program.image,
  icon: <program.icon aria-hidden="true" />,
  tags: program.examples,
}))

export function EducationPrograms() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
          Education
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          어떤 교육이 필요하신가요?
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          AI 기초 활용부터 직접 만드는 실습, 현업 프로젝트 멘토링까지. 대상과
          목표에 맞춰 교육을 구성합니다.
        </p>
      </div>
      <EducationGallery items={items} />
    </section>
  )
}
