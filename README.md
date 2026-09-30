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
  data.ts             # 교육 종류·고객사·프로젝트, 활동 그래프 집계
  calendar-activities.json # 교육·멘토링·녹화 강의, 기간별 단일 분류
  calendar-curriculum.json # 날짜 없는 교안·커리큘럼 제작 목록
  client-logos.json    # 확인된 로고가 있는 기관만 표시
  org-logos.json       # 교육 이력 타임라인 전용 추가 로고(로고 월에는 미표시)
components/
  ui/                 # shadcn 컴포넌트 (button·badge에 brand/tech variant 추가)
  sections/           # 페이지 섹션
    site-nav · hero(소개·프로필 아래 전체 폭 활동 그래프)
    education-programs(elastic-gallery) · activity-timeline(탭 필터, client)
    education-filter(두 섹션이 공유하는 선택 상태)
    projects(carousel-07) · contact-cta · logo-wall · site-footer
```

## 콘텐츠 수정

교육·멘토링 이력은 **`lib/calendar-activities.json`**, 날짜 없는 교안 목록은 **`lib/calendar-curriculum.json`**, 자기소개는 **`components/sections/hero.tsx`**, 교육 종류·프로젝트는 **`lib/data.ts`**에서 고친다.

- `educationPrograms` — AI 리터러시·업무 활용, 바이브코딩(업무 자동화 포함), 데이터 분석·머신러닝, LLM·RAG 응용 개발, AI 프로젝트 멘토링, 교안·커리큘럼 제작. `image`는 `public/education/`의 생성 사진 경로.
- `caseStudy` — 확인된 교육 사례. LLM 사례는 2026년 6월 22일 교육 기록이며, RAG는 요청된 교육 주제로 소개한다. 확인되지 않은 RAG 강의 이력을 만들지 않는다.
- `activities` — `cat`은 교육/멘토링/녹화 강의, `types`는 교육 종류 목록(주제 미확인 시 빈 배열). 한 과정이 여러 종류에 걸치면 해당 탭마다 노출된다.
- 한국지역난방공사 교육은 `AI Pioneer` 한 항목으로 묶고(기간 26.05~09), AI 리터러시·바이브코딩·데이터·LLM·프로젝트 멘토링 탭에 모두 노출한다. 개인 교육은 1~2월의 한 항목으로 묶고 기관명은 `개인`으로 표시한다.
- 녹화 강의는 별도 탭 없이 `전체`에서만 보인다.
- `curriculumActivities` — 교안·커리큘럼 목록. 날짜 필드가 없어 이력 표의 `교안 제작` 탭에서만 보이고 `전체`에는 섞지 않는다.
- `projects` — 교육과 분리한 개발·연구 프로젝트. `image`는 `public/projects/`의 생성 PNG 경로.
- 숫자 통계 밴드와 푸터의 소셜·연락처 링크는 표시하지 않는다.
- 고객사 영역은 페이지 하단에 작은 `Companies I’ve worked with` 제목과 실제 로고만 표시한다. `components/ui/logo-cloud-2.tsx`의 테두리 카드를 두 줄로 배치하고 왼쪽으로 일정하게 이동하며, 동일한 로고 묶음을 이어 붙여 끊김 없이 반복한다. 동작 줄이기 설정에서는 원본 로고를 가로 스크롤로 볼 수 있다. 확인하지 못한 로고는 제외한다. Aside로 확인한 출처는 `artifacts/client-logos/research.json`, 로고 파일은 `public/clients/`에 둔다.

## 캘린더 반영 기준

- 마지막 확인: **2026-09-30**, 기간: **2025-11-01~2026-09-30** (Asia/Seoul).
- 기본 캘린더의 등록 일정을 교육 주제·기간별로 묶은 수동 스냅샷이다. API 자동 동기화는 하지 않는다.
- 개인 생활 일정, 사전 미팅·행정 연락, 커뮤니티 행사, 취소·거절·미응답 일정은 교육 이력에서 제외한다. 공개 데이터에 참석자, 연락처, 캘린더 ID와 원문 설명을 저장하지 않는다.
- 같은 교육의 같은 날짜 작업 블록은 한 번만 기록한다. 그래프는 교육·멘토링·녹화 강의의 실제 날짜로 생성하고 활동일은 날짜 중복을 제거해 센다.
- 교안 제작과 프로젝트 개발 일정은 교육 타임라인·그래프에 포함하지 않는다.
- 등록 일정만으로 완료 여부를 확정하지 않는다. 다음 업데이트 시 일정 날짜와 `calendarUpdatedAt`을 함께 갱신한다.

## 교육 종류 갤러리

- `components/ui/elastic-gallery.tsx` — 접힌 항목은 직사각형, 클릭한 항목은 원으로 펼친다. hover로는 바뀌지 않는다(레이아웃이 움직이며 커서 아래 항목이 연쇄 선택되던 문제). 키보드는 Enter·Space.
- 펼칠 때 `components/ui/liquid-reveal.tsx`의 WebGL 글래스 셰이더가 물결처럼 번진다. 동작 줄이기 설정에서는 생략한다. 흐림은 filter 대신 불투명도 레이어로 처리한다(filter 전환 시 확대 이미지가 흔들림).
- 항목을 클릭하면 아래 이력 표가 같은 종류로 필터링된다. 이력 표 탭을 바꾸면 갤러리도 따라 펼쳐진다(`전체`·`녹화 강의` 제외).
- 이미지는 god-tibo-imagen으로 생성한 실사풍 사진이다.

## 프로젝트 갤러리

- shadcn/ui, Tailwind CSS, TypeScript는 기존 프로젝트에 구성되어 있다. 공통 UI는 `components/ui/`, 스타일 토큰은 `app/globals.css`를 사용한다.
- `components/ui/carousel-07.tsx`는 제공된 스택형 캐러셀을 프로젝트 데이터에 연결한 컴포넌트다. 기존 Badge의 brand/tech 변형을 유지하고 `motion` 의존성을 추가했다.
- 좌우 카드 클릭·터치, 드래그, 이전/다음 버튼, 프로젝트 선택 점, 방향키·Home·End 탐색을 지원한다. 카드 선택 시 순환 위치에서 가장 가까운 방향으로 이동한다. Motion의 탭 취소 동작으로 드래그를 클릭과 구분한다.
- [Motion 드래그 문서](https://motion.dev/docs/react-drag), [Motion 값 이벤트](https://motion.dev/docs/react-use-motion-value-event)를 참고했다.
- [Motion 탭 제스처](https://motion.dev/docs/react-gestures)는 드래그 중 카드 선택이 발생하지 않도록 처리한다.
- 프로젝트 이미지는 god-tibo-imagen으로 생성한 컨셉 일러스트이며 실제 서비스 화면을 표현하는 스크린샷이 아니다.
- 생성 프롬프트와 출력 경로: `artifacts/project-images/batch.json`. 검증한 원본 PNG를 `public/projects/`에 두고 Next Image로 화면 크기에 맞춰 제공한다.

## 채워야 할 placeholder

- 연락처: `contact-cta.tsx`의 `mailto:` / `href="#"` (이메일·강의 소개서 PDF)
- 히어로 헤드샷: `hero.tsx`의 `HEADSHOT` URL (현재 임시 이미지)
- 실제 강의 완료 여부는 캘린더 등록 기록과 별도로 확인할 수 있다.

## 배포

Vercel 권장 — 루트를 `web/`로 지정하면 zero-config 배포된다.

```bash
npx vercel        # 프리뷰
npx vercel --prod # 프로덕션
```
