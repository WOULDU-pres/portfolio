"use client"

import { useState } from "react"

import { useEducationFilter } from "@/components/sections/education-filter"
import {
  ElasticGallery,
  type ElasticGalleryItem,
} from "@/components/ui/elastic-gallery"
import type { EducationType } from "@/lib/data"

export function EducationGallery({ items }: { items: ElasticGalleryItem[] }) {
  const { filter, setFilter } = useEducationFilter()
  // The "all" timeline tab has no matching program, so it keeps the
  // gallery on the last program shown, whichever side picked it.
  const [lastId, setLastId] = useState(items[0]?.id)
  const matched = items.some((item) => item.id === filter) ? filter : undefined
  if (matched && matched !== lastId) setLastId(matched)

  return (
    <ElasticGallery
      items={items}
      activeId={matched ?? lastId}
      onActiveChange={(id) => setFilter(id as EducationType)}
    />
  )
}
