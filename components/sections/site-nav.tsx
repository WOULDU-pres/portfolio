import { Button } from "@/components/ui/button"

const links = [
  ["#strengths", "강점"],
  ["#experience", "활동 이력"],
  ["#activity", "활동 그래프"],
  ["#projects", "프로젝트"],
  ["#contact", "문의"],
] as const

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="text-lg font-extrabold tracking-tight">
          주현우<span className="text-brand">.</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
        <Button asChild variant="brand" size="sm">
          <a href="#contact">강의 문의</a>
        </Button>
      </nav>
    </header>
  )
}
