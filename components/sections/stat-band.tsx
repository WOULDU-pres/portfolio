"use client"

import { useEffect, useRef, useState } from "react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { activityPeriod, stats } from "@/lib/data"

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.disconnect()
          let cur = 0
          const step = Math.max(1, Math.round(value / 30))
          const iv = setInterval(() => {
            cur += step
            if (cur >= value) {
              cur = value
              clearInterval(iv)
            }
            setN(cur)
          }, 30)
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  )
}

export function StatBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <Separator />
      <div className="grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "text-center lg:border-l-2 lg:pl-5 lg:text-left",
              i === 0 ? "lg:border-brand" : "lg:border-border"
            )}
          >
            <div className="text-4xl font-bold tracking-tight">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <p className="mt-3 text-center font-mono text-xs text-muted-foreground lg:text-right">
        활동 기간 {activityPeriod}
      </p>
    </section>
  )
}
