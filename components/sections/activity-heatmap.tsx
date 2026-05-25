import { Card } from "@/components/ui/card"
import {
  buildHeatmap,
  heatmapColors,
  heatmapMonths,
} from "@/lib/data"

export function ActivityHeatmap() {
  const cols = buildHeatmap()

  return (
    <section id="activity" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">교육 활동 그래프</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          매주 현장에 있습니다. 칸이 진할수록 그 주의 활동이 많았던 날입니다.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="mb-2 flex justify-between px-1 font-mono text-xs text-muted-foreground">
          {heatmapMonths.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        <div className="flex gap-[3px] overflow-x-auto pb-2">
          {cols.map((col, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {col.map((lvl, d) => (
                <div
                  key={d}
                  title="교육 활동"
                  className="size-[11px] rounded-[2px]"
                  style={{ background: heatmapColors[lvl] }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted-foreground">
            누적 활동 <strong className="text-foreground tabular-nums">40+</strong>건 · 7개월
          </span>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            적음
            {heatmapColors.map((c) => (
              <span
                key={c}
                className="inline-block size-[11px] rounded-[2px]"
                style={{ background: c }}
              />
            ))}
            많음
          </div>
        </div>
      </Card>
    </section>
  )
}
