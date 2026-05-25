import { clients } from "@/lib/data"

export function LogoWall() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          이런 곳에서 가르쳤습니다
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {clients.map((client) => (
          <div
            key={client}
            className="flex items-center justify-center bg-card px-4 py-7 text-center text-[15px] font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            {client}
          </div>
        ))}
      </div>
    </section>
  )
}
