"use client"

import Image from "next/image"
import { useState, type ReactNode } from "react"

import { LiquidReveal } from "@/components/ui/liquid-reveal"
import { cn } from "@/lib/utils"

export type ElasticGalleryItem = {
  id: string
  title: string
  label: string
  desc: string
  image: string
  icon?: ReactNode
  tags?: string[]
}

const EASE = "duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"

// Collapsed items are rectangles; clicking one grows it into a circle.
function ElasticGallery({
  items,
  activeId: controlledId,
  defaultActiveId,
  onActiveChange,
  className,
}: {
  items: ElasticGalleryItem[]
  activeId?: string
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  className?: string
}) {
  const [uncontrolledId, setUncontrolledId] = useState(
    defaultActiveId ?? items[0]?.id
  )
  const activeId = controlledId ?? uncontrolledId
  // Replay the liquid reveal whenever the active item changes, whether from a
  // click here or from a controlled activeId (not on first paint).
  const [revealId, setRevealId] = useState<string | null>(null)
  const [previousId, setPreviousId] = useState(activeId)
  if (activeId !== previousId) {
    setPreviousId(activeId)
    setRevealId(activeId)
  }

  const activate = (id: string) => {
    onActiveChange?.(id)
    setUncontrolledId(id)
  }

  return (
    <ul
      className={cn(
        "flex w-full flex-col items-center gap-2 md:h-[380px] md:flex-row md:gap-3 lg:h-[520px]",
        className
      )}
    >
      {items.map((item) => {
        const active = item.id === activeId

        return (
          <li
            key={item.id}
            tabIndex={0}
            role="button"
            aria-expanded={active}
            onClick={() => activate(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                activate(item.id)
              }
            }}
            className={cn(
              "relative shrink-0 cursor-pointer overflow-hidden bg-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "group transition-[flex,width,height,border-radius]",
              EASE,
              active
                ? "size-[min(calc(100vw-3rem),26rem)] rounded-[50%] md:h-full md:w-auto md:flex-[0_0_380px] lg:flex-[0_0_520px]"
                : "h-14 w-full rounded-2xl md:h-full md:w-auto md:min-w-0 md:flex-1"
            )}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 380px, 100vw"
              className={cn(
                "object-cover transition-transform duration-1000 will-change-transform",
                active ? "scale-100" : "scale-110"
              )}
            />
            {/* Dim with an opacity layer, not filter: animating filter on a
                scaled image re-rasterizes it and makes it shimmer on hover. */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-black transition-opacity duration-500",
                active ? "opacity-0" : "opacity-50 group-hover:opacity-30"
              )}
            />
            {active && revealId === item.id && (
              <LiquidReveal
                key={item.id}
                src={item.image}
                onDone={() => setRevealId(null)}
              />
            )}
            <div
              className={cn(
                "absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.25)_100%)] transition-opacity",
                active
                  ? "opacity-100 delay-700 duration-700"
                  : "opacity-0 duration-300"
              )}
            />

            {/* Expanded: content fits inside the circle */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center p-[15%] text-center text-white transition-all duration-500",
                active
                  ? "translate-y-0 opacity-100 delay-900"
                  : "pointer-events-none translate-y-8 opacity-0"
              )}
            >
              {item.icon && (
                <span className="mb-3 [&_svg]:size-6 lg:[&_svg]:size-7">
                  {item.icon}
                </span>
              )}
              <h3 className="text-lg leading-snug font-bold break-keep lg:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed break-keep text-white/80 lg:mt-3 lg:text-sm">
                {item.desc}
              </p>
              {item.tags && (
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 lg:mt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-[10px] backdrop-blur-md lg:px-2.5 lg:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsed: horizontal label on mobile, vertical on desktop */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 flex items-center gap-2 px-5 text-white transition-opacity duration-500 md:items-end md:justify-center md:px-0 md:pb-8",
                active ? "opacity-0" : "opacity-100 delay-300"
              )}
            >
              {item.icon && (
                <span className="md:hidden [&_svg]:size-4">{item.icon}</span>
              )}
              <span className="text-sm font-bold whitespace-nowrap md:hidden">
                {item.label}
              </span>
              {/* Korean words run vertically; Latin words (AI, LLM) and "·"
                  stay horizontal. A space would take a full line slot in
                  vertical text, so words are stacked with a small gap. */}
              <span className="hidden flex-col items-center gap-2 text-base leading-none font-bold md:flex">
                {item.label.split(/\s+/).map((word, index) => (
                  <span
                    key={index}
                    className={
                      /^[A-Za-z0-9·]+$/.test(word)
                        ? "whitespace-nowrap"
                        : "tracking-[-0.12em] [writing-mode:vertical-rl]"
                    }
                  >
                    {word}
                  </span>
                ))}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { ElasticGallery }
