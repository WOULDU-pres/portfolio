"use client"

import Image from "next/image"
import { useLayoutEffect, useRef, useState } from "react"

import { useEducationFilter } from "@/components/sections/education-filter"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  activities,
  categoryLabels,
  categoryTabs,
  curriculumActivities,
  educationPrograms,
  orgLogos,
  type EducationType,
} from "@/lib/data"

type TimelineItem = {
  id: string
  org: string
  topic: string
  date?: string
  tag?: string
  projects?: string[]
}

// Collapsed height of the list; the rest fades out behind "더 보기".
const COLLAPSED_HEIGHT = 560

const logos = new Map(orgLogos.map((org) => [org.name, org.logo]))
const programLabels = new Map<string, string>(
  educationPrograms.map((program) => [program.id, program.label])
)

function OrgLogo({ org }: { org: string }) {
  const logo = logos.get(org)
  return (
    <span className="flex h-7 w-14 shrink-0 items-center justify-center rounded-md bg-white px-1.5 ring-1 ring-foreground/10">
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={48}
          height={20}
          className="max-h-4.5 w-auto object-contain"
        />
      ) : (
        <span className="text-[10px] font-bold text-neutral-500">
          {org.slice(0, 2)}
        </span>
      )}
    </span>
  )
}

function monthKey(lastDate: string) {
  return lastDate.slice(0, 7).replace("-", ".")
}

export function ActivityTimeline() {
  const { filter: cat, setFilter: setCat } = useEducationFilter()
  const [expanded, setExpanded] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => setOverflowing(list.scrollHeight > COLLAPSED_HEIGHT)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [cat])

  const toggle = () => {
    if (expanded) sectionRef.current?.scrollIntoView({ block: "start" })
    setExpanded(!expanded)
  }

  const selectCat = (value: EducationType | "all") => {
    setCat(value)
    setExpanded(false)
  }

  // Curriculum work has no dates, so it becomes a single undated group.
  const groups: [string, TimelineItem[]][] = []
  if (cat === "curriculum") {
    groups.push(["교안 작업", curriculumActivities])
  } else {
    for (const a of activities) {
      if (cat !== "all" && !a.types.includes(cat)) continue
      const key = monthKey(a.lastDate)
      const item: TimelineItem = {
        id: a.id,
        org: a.org,
        topic: a.topic,
        date: a.date,
        projects: cat === "mentoring" ? a.projects : undefined,
        // Only the "전체" view needs a chip; mentoring rows carry none.
        tag:
          cat === "all" && a.cat !== "mentoring"
            ? a.types.length === 1
              ? programLabels.get(a.types[0])
              : categoryLabels[a.cat]
            : undefined,
      }
      const last = groups.at(-1)
      if (last?.[0] === key) last[1].push(item)
      else groups.push([key, [item]])
    }
  }

  const items = groups.flatMap(([, list]) => list)
  const collapsed = overflowing && !expanded
  const title =
    cat === "all"
      ? "전체 교육 이력"
      : (educationPrograms.find((p) => p.id === cat)?.title ??
        categoryTabs.find((t) => t.value === cat)?.label)

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="mx-auto max-w-6xl px-6 pb-20"
    >
      <div className="mb-8 flex flex-col gap-6">
        <Tabs
          value={cat}
          onValueChange={(v) => selectCat(v as EducationType | "all")}
          className="max-w-full min-w-0 items-center"
        >
          <TabsList className="max-w-full flex-wrap justify-center group-data-horizontal/tabs:h-auto">
            {categoryTabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="h-auto px-3 py-2"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-brand uppercase">
          Track record
        </p>
        <h3 className="mt-1 text-xl font-bold break-keep">{title}</h3>

        {/* overflow-clip, not hidden, so month labels can stay sticky. */}
        <div
          className="relative mt-8 overflow-clip"
          style={collapsed ? { maxHeight: COLLAPSED_HEIGHT } : undefined}
        >
          <div ref={listRef} className="grid gap-x-10 md:grid-cols-[120px_1fr]">
            {groups.map(([month, list]) => (
              <div key={month} className="contents">
                <div className="mb-3 flex items-baseline gap-2 md:sticky md:top-20 md:mb-0 md:block md:self-start md:pt-1">
                  <div className="font-mono text-sm font-bold text-brand tabular-nums">
                    {month}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {list.length}건
                  </div>
                </div>
                <ol className="relative mb-10 ml-1 border-l border-dashed border-foreground/15 md:ml-0">
                  {list.map((item) => (
                    <li key={item.id} className="relative pb-6 pl-6 last:pb-0">
                      <span className="absolute top-2.5 -left-[5px] size-2.5 rounded-full bg-brand ring-4 ring-brand/15" />
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <OrgLogo org={item.org} />
                        <span className="font-bold">{item.org}</span>
                        {item.tag && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            {item.tag}
                          </span>
                        )}
                        {item.date && item.date.includes("~") && (
                          <span className="font-mono text-xs text-muted-foreground tabular-nums">
                            {item.date}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed break-keep text-muted-foreground">
                        {item.topic}
                      </p>
                      {item.projects && (
                        <ul className="mt-2.5 flex flex-wrap gap-1.5">
                          {item.projects.map((project) => (
                            <li
                              key={project}
                              className="rounded-md bg-muted px-2.5 py-1 text-xs leading-snug break-keep text-foreground/80"
                            >
                              {project}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          {collapsed && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent"
            />
          )}
        </div>

        {overflowing && (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            className="mx-auto mt-4 block rounded-full border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {expanded ? "접기" : `전체 ${items.length}건 모두 보기`}
          </button>
        )}
      </div>
    </section>
  )
}
