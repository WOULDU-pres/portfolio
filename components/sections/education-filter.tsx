"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

import type { EducationType } from "@/lib/data"

type EducationFilter = EducationType | "all"

// Shared between the program gallery and the activity timeline so picking a
// program also filters the history below it.
const EducationFilterContext = createContext<{
  filter: EducationFilter
  setFilter: (filter: EducationFilter) => void
} | null>(null)

export function EducationFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<EducationFilter>("all")

  return (
    <EducationFilterContext value={{ filter, setFilter }}>
      {children}
    </EducationFilterContext>
  )
}

export function useEducationFilter() {
  const context = useContext(EducationFilterContext)
  if (!context) {
    throw new Error(
      "useEducationFilter must be used within EducationFilterProvider"
    )
  }
  return context
}
