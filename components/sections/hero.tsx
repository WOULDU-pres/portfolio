import { ActivityHeatmap } from "@/components/sections/activity-heatmap"
import { ContactChips } from "@/components/sections/hero-contact"

const HEADSHOT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtTW1Q2xRaaccTLL2A5VYeCvNrI8-KDFl05N3AdJQ0e4Q72TLv0imcMnD8YNoRLxzWpor7uFMnFeRBPo2QlbNPOMVJNs7i7ADU1xxMErR3F5ULOd8lCVAMPsH8gUKdyY8PK3hDoG5QXhonrxeCfbgGhd6RrxuP61uc5KPEkmtn-4UuMie3p6bNXXy6VtwWyONxSP_SjdsjA3Jd7NgXRT_ooM9YqTNaBuL5Iw-ExKU_GCg3bHjxArUhC421BTSvXt13w6rPa5EBO5mG"

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-14 pb-10 lg:grid-cols-12"
    >
      <div className="lg:col-span-7">
        <h1 className="text-[clamp(1.5rem,7.5vw,3rem)] leading-[1.12] font-extrabold tracking-tight sm:text-5xl">
          새로운 AI에
          <br />
          <span className="text-brand">친근하게 다가갈 수 있게</span>
          <br />
          도와주는 파트너
        </h1>
        <div className="mt-6 max-w-2xl text-lg leading-relaxed break-keep text-muted-foreground">
          <p>언제나 배움을 나누며 주변과 함께 성장해왔습니다.</p>
          <p className="mt-3">
            수강생이 “나도 할 수 있다”는 자신감을 얻고,
            <br />
            AI로 자신만의 아이디어를 개척해가는 걸 도울 때
            <br />
            가장 보람을 느낍니다.
          </p>
        </div>
        <ContactChips />
      </div>

      <div className="min-w-0 lg:col-span-5">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-4 border-primary lg:translate-x-6 lg:translate-y-6" />
          <div className="relative size-full overflow-hidden rounded-2xl bg-muted shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HEADSHOT}
              alt="주현우 강사 프로필 사진"
              className="size-full object-cover object-top"
            />
          </div>
        </div>
      </div>
      <ActivityHeatmap />
    </section>
  )
}
