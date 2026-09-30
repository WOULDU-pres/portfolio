import { Card } from "@/components/ui/card"
import {
  activityDayCount,
  buildHeatmap,
  heatmapColors,
  heatmapMonths,
} from "@/lib/data"

export function ActivityHeatmap() {
  const cols = buildHeatmap()
  const columns = `repeat(${cols.length}, minmax(0, 1fr))`

  return (
    <section id="activity" className="w-full min-w-0 lg:col-span-12">
      <Card className="gap-4 p-4 sm:gap-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold sm:text-base">
            교육 활동일 그래프
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            {activityDayCount}일
          </span>
        </div>
        <div>
          <div
            className="mb-2 grid gap-[2px] font-mono text-[8px] text-muted-foreground sm:mb-3 sm:gap-1 sm:text-xs"
            style={{ gridTemplateColumns: columns }}
          >
            {heatmapMonths.map((month) => (
              <span
                key={month.label}
                className="whitespace-nowrap"
                title={month.label}
                style={{ gridColumnStart: month.week + 1 }}
              >
                {month.label.length > 2 ? month.label.slice(2) : month.label}
              </span>
            ))}
          </div>
          <div
            className="grid gap-[2px] sm:gap-1"
            style={{ gridTemplateColumns: columns }}
          >
            {cols.map((col, week) => (
              <div key={week} className="flex flex-col gap-[2px] sm:gap-1">
                {col.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date} · 교육 활동 ${day.count}건`}
                    aria-label={`${day.date} 교육 활동 ${day.count}건`}
                    aria-hidden={!day.inPeriod}
                    className="aspect-square w-full rounded-[1px] sm:rounded-[2px]"
                    style={{
                      background: heatmapColors[day.level],
                      visibility: day.inPeriod ? "visible" : "hidden",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 text-[10px] text-muted-foreground sm:text-xs">
          <div className="flex items-center gap-1 font-mono">
            적음
            {heatmapColors.map((color) => (
              <span
                key={color}
                className="inline-block size-[7px] rounded-[1px] sm:size-3 sm:rounded-[2px]"
                style={{ background: color }}
              />
            ))}
            많음
          </div>
        </div>
      </Card>
    </section>
  )
}
