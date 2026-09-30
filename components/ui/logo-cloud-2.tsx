import type { ComponentProps, CSSProperties } from "react"
import Image from "next/image"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
}

type LogoCloudProps = ComponentProps<"div"> & {
  logos: Logo[]
}

export function LogoCloud({
  logos,
  className,
  style,
  ...props
}: LogoCloudProps) {
  const marqueeStyle = {
    "--logo-cloud-duration": `${Math.max(30, Math.ceil(logos.length / 2) * 4)}s`,
    ...style,
  } as CSSProperties

  return (
    <div
      className={cn(
        "relative overflow-hidden border-x motion-reduce:overflow-x-auto",
        className
      )}
      style={marqueeStyle}
      {...props}
    >
      <div className="logo-cloud-track flex w-max py-3">
        {[false, true].map((duplicate) => (
          <div
            key={String(duplicate)}
            role={duplicate ? undefined : "list"}
            aria-label={duplicate ? undefined : "함께한 회사"}
            aria-hidden={duplicate || undefined}
            className={cn(
              "grid shrink-0 grid-flow-col grid-rows-2",
              duplicate && "motion-reduce:hidden"
            )}
          >
            {logos.map((logo, index) => (
              <LogoCard
                key={logo.alt}
                role={duplicate ? undefined : "listitem"}
                logo={duplicate ? { ...logo, alt: "" } : logo}
                className={cn(
                  "relative border-r border-b",
                  index % 2 === 0 && "border-t",
                  (Math.floor(index / 2) + (index % 2)) % 2 === 0 &&
                    "bg-secondary dark:bg-secondary/30"
                )}
              >
                {index % 2 === 0 && (
                  <PlusIcon
                    aria-hidden="true"
                    className="absolute -right-3 -bottom-3 z-10 size-6"
                    strokeWidth={1}
                  />
                )}
              </LogoCard>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

type LogoCardProps = ComponentProps<"div"> & {
  logo: Logo
}

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex h-28 w-44 shrink-0 items-center justify-center bg-background px-4 md:h-32 md:w-56 md:px-8",
        className
      )}
      {...props}
    >
      <Image
        alt={logo.alt}
        src={logo.src}
        width={logo.width ?? 176}
        height={logo.height ?? 48}
        sizes="(min-width: 768px) 160px, 144px"
        loading="eager"
        className="pointer-events-none h-8 w-full object-contain select-none md:h-10"
      />
      {children}
    </div>
  )
}
