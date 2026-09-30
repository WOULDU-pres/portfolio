const links = [
  ["#education", "교육 종류"],
  ["#experience", "교육 이력"],
  ["#projects", "프로젝트"],
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
      </nav>
    </header>
  )
}
