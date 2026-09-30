export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-xl font-bold">
          주현우<span className="text-brand">.</span>
        </div>
        <div className="text-sm text-primary-foreground/60">
          © 2026 주현우 · AI 교육 강사 &amp; 개발자
        </div>
      </div>
    </footer>
  )
}
