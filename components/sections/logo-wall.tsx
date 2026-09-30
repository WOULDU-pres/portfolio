import { LogoCloud } from "@/components/ui/logo-cloud-2"
import { clients } from "@/lib/data"

export function LogoWall() {
  return (
    <section id="worked-with" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8 text-center">
        <h2 className="text-xs font-medium tracking-[0.12em] text-muted-foreground">
          Companies I’ve worked with
        </h2>
      </div>
      <LogoCloud
        logos={clients.map((client) => ({
          src: client.logo,
          alt: client.name,
        }))}
      />
    </section>
  )
}
