"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, Mail, Phone } from "lucide-react"

import { cn } from "@/lib/utils"

const PHONE = { label: "PHONE", value: "010-5246-5778", href: "tel:+821052465778" }
const EMAIL = {
  label: "EMAIL",
  value: "jhw102258@gmail.com",
  href: "mailto:jhw102258@gmail.com",
}

function useCopy() {
  const [copied, setCopied] = React.useState(false)
  const copy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }, [])
  return { copied, copy }
}

function CopyButton({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={`${label} 복사`}
      className={cn(
        "relative grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        copied && "text-emerald-600 hover:text-emerald-600",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.4, opacity: 0, filter: "blur(4px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.4, opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="pointer-events-none absolute -top-8 rounded-md bg-foreground px-2 py-1 text-xs font-medium whitespace-nowrap text-background"
          >
            복사됨
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function ContactChip({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone
  label: string
  value: string
  href: string
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border bg-card py-2.5 pr-2 pl-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
        <Icon className="size-[18px]" />
      </span>
      <a href={href} className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] font-semibold tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="block truncate text-[15px] font-bold text-foreground">
          {value}
        </span>
      </a>
      <CopyButton value={value} label={label} />
    </div>
  )
}

export function ContactChips() {
  return (
    <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
      <ContactChip icon={Phone} {...PHONE} />
      <ContactChip icon={Mail} {...EMAIL} />
    </div>
  )
}
