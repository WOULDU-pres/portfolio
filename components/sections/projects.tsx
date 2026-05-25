import { Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { projects } from "@/lib/data"

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-10 text-right">
        <h2 className="text-3xl font-bold tracking-tight">프로젝트 및 연구 이력</h2>
        <p className="mt-3 ml-auto max-w-md text-muted-foreground">
          강의만이 아니라, 직접 만들어 본 사람. 실무 AI 개발 및 웹 서비스 구축 이력.
        </p>
      </div>
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
        {projects.map((p) => (
          <Card key={p.title} className="break-inside-avoid transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <Badge variant="outline" className="font-mono">
                  {p.period}
                </Badge>
                {p.award && (
                  <Badge variant="brand">
                    <Trophy data-icon="inline-start" />
                    {p.award}
                  </Badge>
                )}
              </div>
              <CardTitle className="mt-3 text-xl leading-snug">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator />
            </CardContent>
            <CardFooter className="justify-between">
              <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                수행기관
              </span>
              <span className="font-bold">{p.org}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
