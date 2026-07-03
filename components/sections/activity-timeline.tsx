"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { activities, categoryTabs, roleBadgeVariant, type Category } from "@/lib/data"

export function ActivityTimeline() {
  const [cat, setCat] = useState<Category | "all">("all")
  const rows = activities.filter((a) => cat === "all" || a.cat === cat)

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">2026 활동 이력</h2>
          <p className="mt-3 max-w-md text-muted-foreground">강의 · 교안 · 멘토링 · 과외까지, 2026년 7월까지의 활동입니다.</p>
        </div>
        <Tabs value={cat} onValueChange={(v) => setCat(v as Category | "all")}>
          <TabsList>
            {categoryTabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Card className="px-5 py-2 sm:px-8">
        {rows.map((a, i) => (
          <div key={`${a.org}-${a.topic}-${i}`} className="flex flex-col gap-2 border-b py-4 last:border-0 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-24 shrink-0 font-mono text-xs text-brand tabular-nums">{a.date}</div>
            <div className="w-full shrink-0 font-bold sm:w-52">{a.org}</div>
            <div className="flex-1 text-muted-foreground">{a.topic}</div>
            <Badge variant={roleBadgeVariant(a.role)}>{a.role}</Badge>
          </div>
        ))}
      </Card>

      <p className="mt-4 font-mono text-xs text-muted-foreground">* 일부 항목은 일정명 기준이며 실제 강의 완료 여부는 확인이 필요합니다.</p>
    </section>
  )
}
