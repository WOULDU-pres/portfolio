import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const HEADSHOT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCtTW1Q2xRaaccTLL2A5VYeCvNrI8-KDFl05N3AdJQ0e4Q72TLv0imcMnD8YNoRLxzWpor7uFMnFeRBPo2QlbNPOMVJNs7i7ADU1xxMErR3F5ULOd8lCVAMPsH8gUKdyY8PK3hDoG5QXhonrxeCfbgGhd6RrxuP61uc5KPEkmtn-4UuMie3p6bNXXy6VtwWyONxSP_SjdsjA3Jd7NgXRT_ooM9YqTNaBuL5Iw-ExKU_GCg3bHjxArUhC421BTSvXt13w6rPa5EBO5mG"

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-14 pb-10 lg:grid-cols-12"
    >
      <div className="lg:col-span-7">
        <Badge variant="brand" className="mb-6">
          <Sparkles data-icon="inline-start" />
          생성형 AI · 바이브코딩 · 업무 자동화 교육
        </Badge>
        <h1 className="text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl">
          복잡한 AI를
          <br />
          <span className="text-brand">현장에서 바로 쓰게</span>
          <br />
          만드는 기업 교육 파트너
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          포스코그룹·현대카드·삼성인력개발원 등{" "}
          <strong className="font-semibold text-foreground">20여 곳</strong>에서 생성형
          AI·바이브코딩 교육을 진행했습니다. 강의부터 교안 설계, 기술 튜터링, 멘토링까지 한
          번에 맡깁니다.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" className="h-11 px-7">
            <a href="#contact">
              강의 문의하기
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11 px-7">
            <a href="#experience">강의 이력 보기</a>
          </Button>
        </div>
      </div>

      <div className="lg:col-span-5">
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
    </section>
  )
}
