import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { strengths } from "@/lib/data"

const toneStyles = {
  brand: "bg-brand/10 text-brand",
  tech: "bg-tech/10 text-tech",
  primary: "bg-primary/5 text-primary",
} as const

export function Strengths() {
  return (
    <section id="strengths" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">강점 세 가지</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          단순 강의가 아니라, 기업별 맞춤 설계 → 실습형 운영 → 교안·멘토링까지 한 흐름으로
          연결합니다.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {strengths.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.title} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div
                  className={cn(
                    "mb-2 flex size-14 items-center justify-center rounded-xl [&_svg]:size-7",
                    toneStyles[s.tone]
                  )}
                >
                  <Icon />
                </div>
                <CardTitle className="text-xl">{s.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {s.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={s.tone === "tech" ? "tech" : "secondary"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
