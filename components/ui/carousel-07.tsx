"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface CarouselSlide {
  image: string
  title: string
  badge: string
  period?: string
  award?: string
}

interface CarouselConfig {
  distanceDivisor: number
  velocityDivisor: number
  sensitivity: number
  xMultiplier: number
  yMultiplier: number
  rotationMultiplier: number
  scaleReduction: number
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    }
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    }
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  }
}

function subscribeToWidth(callback: () => void) {
  window.addEventListener("resize", callback)
  return () => window.removeEventListener("resize", callback)
}

function wrapIndex(index: number, total: number) {
  return total ? ((index % total) + total) % total : 0
}

function wrappedOffset(index: number, progress: number, total: number) {
  let diff = (index - progress) % total
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

export default function CarouselStacked({
  slides,
  className,
}: {
  slides: CarouselSlide[]
  className?: string
}) {
  const scrollProgress = useMotionValue(0)
  const startProgress = React.useRef(0)
  const animation = React.useRef<{ stop: () => void } | null>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const windowWidth = React.useSyncExternalStore(
    subscribeToWidth,
    () => window.innerWidth,
    () => 1024
  )
  const reducedMotion = useReducedMotion()
  const total = slides.length
  const config = getCarouselConfig(windowWidth)

  useMotionValueEvent(scrollProgress, "change", (value) => {
    const next = wrapIndex(Math.round(value), total)
    setActiveIndex((current) => (current === next ? current : next))
  })

  React.useEffect(() => () => animation.current?.stop(), [])

  const settle = (target: number) => {
    animation.current?.stop()
    if (reducedMotion) {
      scrollProgress.set(target)
      return
    }
    animation.current = animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    })
  }

  const move = (step: number) => settle(Math.round(scrollProgress.get()) + step)

  const select = (index: number) => {
    const progress = scrollProgress.get()
    settle(Math.round(progress + wrappedOffset(index, progress, total)))
  }

  const handleDragStart = () => {
    animation.current?.stop()
    startProgress.current = scrollProgress.get()
  }

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const distanceShift = -info.offset.x / config.distanceDivisor
    const velocityShift = -info.velocity.x / config.velocityDivisor
    const shift = Math.max(
      -3,
      Math.min(3, Math.round(distanceShift + velocityShift))
    )
    settle(Math.round(startProgress.current) + shift)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      move(-1)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      move(1)
    }
    if (event.key === "Home") {
      event.preventDefault()
      settle(0)
    }
    if (event.key === "End") {
      event.preventDefault()
      settle(total - 1)
    }
  }

  if (!total) return null
  const current = slides[activeIndex]

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="프로젝트 갤러리"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full flex-col items-center overflow-hidden rounded-2xl bg-background py-6 outline-none select-none focus-visible:ring-2 focus-visible:ring-brand",
        className
      )}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDrag={(_, info) =>
          scrollProgress.set(
            scrollProgress.get() - info.delta.x / config.sensitivity
          )
        }
        onDragEnd={handleDragEnd}
        data-testid="project-drag-surface"
        className="relative flex h-80 w-full max-w-7xl cursor-grab touch-pan-y items-center justify-center active:cursor-grabbing sm:h-112 lg:h-128"
      >
        {slides.map((slide, index) => (
          <SlideCard
            key={slide.title}
            slide={slide}
            index={index}
            total={total}
            progress={scrollProgress}
            config={config}
            active={activeIndex === index}
            onSelect={() => select(index)}
          />
        ))}
      </motion.div>

      <div className="mt-3 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          aria-label="이전 프로젝트"
          onClick={() => move(-1)}
          disabled={total < 2}
        >
          <ChevronLeft />
        </Button>
        <span
          className="w-16 text-center font-mono text-sm text-muted-foreground tabular-nums"
          aria-label="현재 프로젝트 번호"
        >
          {activeIndex + 1} / {total}
        </span>
        <Button
          variant="outline"
          size="icon"
          aria-label="다음 프로젝트"
          onClick={() => move(1)}
          disabled={total < 2}
        >
          <ChevronRight />
        </Button>
      </div>
      <div
        className="mt-4 flex flex-wrap justify-center gap-1.5"
        aria-label="프로젝트 선택"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`${slide.title} 보기`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => select(index)}
            className="flex size-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span
              className={cn(
                "size-2 rounded-full transition-colors",
                activeIndex === index ? "bg-brand" : "bg-muted-foreground/30"
              )}
            />
          </button>
        ))}
      </div>
      <div
        className="mt-5 min-h-20 max-w-2xl px-4 text-center"
        aria-live="polite"
        aria-atomic="true"
        data-testid="project-details"
      >
        <p className="font-mono text-xs text-muted-foreground">
          {current.period} · {current.badge}
        </p>
        <h3 className="mt-2 text-xl font-bold">{current.title}</h3>
        {current.award && <AwardBadge award={current.award} className="mt-3" />}
      </div>
    </div>
  )
}

function AwardBadge({
  award,
  className,
}: {
  award: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-bold text-amber-950 shadow-sm sm:px-2.5 sm:text-xs",
        className
      )}
    >
      <Trophy aria-hidden="true" className="size-3 sm:size-3.5" />
      {award}
    </span>
  )
}

interface CardProps {
  slide: CarouselSlide
  index: number
  total: number
  progress: MotionValue<number>
  config: CarouselConfig
  active: boolean
  onSelect: () => void
}

function SlideCard({
  slide,
  index,
  total,
  progress,
  config,
  active,
  onSelect,
}: CardProps) {
  const offset = useTransform(progress, (p) => wrappedOffset(index, p, total))
  const x = useTransform(offset, (o) => o * config.xMultiplier)
  const rotate = useTransform(offset, (o) =>
    Math.abs(o) < 0.05 ? 0 : o * config.rotationMultiplier
  )
  const y = useTransform(offset, (o) =>
    Math.abs(o) < 0.05 ? 0 : Math.abs(o) * config.yMultiplier
  )
  const scale = useTransform(offset, (o) =>
    Math.max(0.4, 1 - Math.abs(o) * config.scaleReduction)
  )
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0]
  )
  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10))
  const shade = useTransform(
    offset,
    [-2, -0.5, 0, 0.5, 2],
    [0.3, 0.1, 0, 0.1, 0.3]
  )
  const textOpacity = useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0])
  const pointerEvents = useTransform(offset, (o) =>
    Math.abs(o) >= total / 2 ? "none" : "auto"
  )

  return (
    <motion.button
      type="button"
      style={{ x, rotate, y, scale, opacity, zIndex, pointerEvents }}
      aria-roledescription="slide"
      aria-label={`${index + 1} / ${total}: ${slide.title}`}
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
      onTap={onSelect}
      onKeyDown={(event) => {
        if (event.key === " ") {
          event.preventDefault()
          onSelect()
        }
      }}
      data-project-index={index}
      className="absolute h-56 w-44 cursor-pointer overflow-hidden rounded-2xl bg-muted shadow-md outline-none focus-visible:ring-2 focus-visible:ring-brand active:cursor-grabbing sm:h-80 sm:w-56 lg:h-96 lg:w-64"
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        sizes="(max-width: 639px) 176px, (max-width: 1023px) 224px, 256px"
        className="pointer-events-none object-cover"
        draggable={false}
      />
      <motion.span
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 bg-black"
      />
      <span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <Badge className="absolute top-3 right-3 h-auto max-w-[80%] rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold tracking-wide text-black backdrop-blur-md sm:top-5 sm:right-5 sm:px-3 sm:text-xs lg:top-6 lg:right-6">
        {slide.badge}
      </Badge>
      {slide.award && (
        <AwardBadge
          award={slide.award}
          className="absolute top-3 left-3 sm:top-5 sm:left-5 lg:top-6 lg:left-6"
        />
      )}
      <span className="absolute right-3 bottom-5 left-3 text-center text-white sm:right-5 sm:bottom-8 sm:left-5 sm:text-left lg:right-6 lg:bottom-10 lg:left-6">
        <motion.span
          style={{ opacity: textOpacity }}
          className="mb-1 block text-sm leading-tight font-bold drop-shadow-md sm:text-lg lg:text-xl"
        >
          {slide.title}
        </motion.span>
        <motion.span
          style={{ opacity: textOpacity }}
          className="hidden text-xs font-medium text-white/80 sm:block"
        >
          {slide.period}
        </motion.span>
      </span>
    </motion.button>
  )
}
