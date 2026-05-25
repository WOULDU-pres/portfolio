# 주현우 — 기업 AI 교육 강사 포트폴리오 (Next.js + shadcn/ui)

`code.html` 단일 파일 시안을 Next.js App Router + shadcn/ui로 컴포넌트화한 버전.

## 실행

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm start        # 빌드 결과 실행
```

## 스택

- **Next.js 16** (App Router, RSC) · **React 19** · **TypeScript**
- **Tailwind v4** + **shadcn/ui** (radix-nova 프리셋)
- 폰트: **Pretendard**(한글) + Geist(라틴) + Geist Mono(숫자·라벨)
- 아이콘: lucide-react

## 구조

```
app/
  layout.tsx          # 폰트·메타데이터·테마(라이트 고정)
  page.tsx            # 섹션 조립
  globals.css         # 테마 토큰 (brand=#ba0035, tech=#4f46e5)
lib/
  data.ts             # ★ 모든 콘텐츠의 단일 출처(이력·고객사·스탯·프로젝트)
components/
  ui/                 # shadcn 컴포넌트 (button·badge에 brand/tech variant 추가)
  sections/           # 페이지 섹션
    site-nav · hero · stat-band · logo-wall · strengths
    activity-timeline(탭 필터, client) · activity-heatmap(잔디)
    projects · contact-cta · site-footer
```

## 콘텐츠 수정

거의 모든 내용은 **`lib/data.ts`** 한 곳에서 고친다.
- `stats` — 히어로 스탯 밴드 숫자
- `clients` — 고객사 로고 월
- `activities` — "2026 활동 이력" 타임라인 (cat: corp/plan/mentor/tutor)
- `strengths` · `projects` — 강점 카드 / 프로젝트 카드

## 채워야 할 placeholder

- 연락처: `contact-cta.tsx`, `site-footer.tsx`의 `mailto:` / `href="#"` (LinkedIn·GitHub·CV·소개서 PDF)
- 히어로 헤드샷: `hero.tsx`의 `HEADSHOT` URL (현재 임시 이미지)
- 활동 히트맵: 현재 결정적 예시 패턴(`lib/data.ts`의 `buildHeatmap`). 실제 활동 건수로 교체 가능
- 스탯 숫자 / 강의 완료 여부: 원본에도 "확인 필요" 표기 — 확정값으로 교체

## 배포

Vercel 권장 — 루트를 `web/`로 지정하면 zero-config 배포된다.

```bash
npx vercel        # 프리뷰
npx vercel --prod # 프로덕션
```
