import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ContactCta() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-brand/30 blur-3xl" />
        <h2 className="relative text-3xl font-bold tracking-tight">
          우리 회사 AI 교육, 어디서부터 시작할까요?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
          강의 · 교안 설계 · 기술 튜터링 · 멘토링까지. 필요한 범위를 알려주시면 맞춤으로
          제안드립니다.
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="brand" className="h-11 px-7">
            <a href="mailto:">
              <Mail data-icon="inline-start" />
              이메일로 문의하기
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-primary-foreground/30 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href="#">강의 소개서 (PDF)</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
