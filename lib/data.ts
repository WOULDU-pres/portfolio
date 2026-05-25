import {
  Building2,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react"

export type Stat = { value: number; suffix: string; label: string }

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "고객사 · 기관" },
  { value: 16, suffix: "+", label: "기업 강의 · 튜터링" },
  { value: 9, suffix: "", label: "교안 · 커리큘럼 설계" },
  { value: 6, suffix: "+", label: "멘토링 · 코칭" },
]

export const activityPeriod = "2025.11 – 2026.05"

export const clients: string[] = [
  "포스코그룹",
  "포스코인터내셔널",
  "현대카드",
  "삼성인력개발원",
  "카카오페이",
  "셀트리온제약",
  "신세계DF",
  "조선일보",
  "녹십자홀딩스",
  "SKT",
  "롯데지주",
  "HD현대",
  "한국투자증권",
  "농심",
  "코오롱",
  "타임폴리오",
  "HDC 아이파크몰",
  "모트렉스",
  "리얼게인",
  "에스씨케이",
]

export type Strength = {
  icon: LucideIcon
  title: string
  desc: string
  tags: string[]
  tone: "brand" | "tech" | "primary"
}

export const strengths: Strength[] = [
  {
    icon: Building2,
    title: "기업별 맞춤 AI 교육",
    desc: "산업·직급에 맞춰 설계한 생성형 AI 교육. 임원 과정부터 승진자·중간 리더·개발자 대상까지.",
    tags: ["임원 과정", "승진자", "리더십 PBL"],
    tone: "brand",
  },
  {
    icon: Terminal,
    title: "실습형 기술 교육 (바이브코딩)",
    desc: "툴을 직접 손에 쥐여주는 실습 중심. 듣고 끝나는 강의가 아니라, 끝나면 바로 쓰는 교육.",
    tags: [
      "Cursor AI",
      "Gemini",
      "NotebookLM",
      "Claude Cowork",
      "OpenClaw",
      "업무 자동화",
    ],
    tone: "tech",
  },
  {
    icon: Users,
    title: "교안 설계 + 운영 + 멘토링",
    desc: "강의만 하지 않습니다. 커리큘럼·PBL 교안 설계, 과제 피드백, 수강생 멘토링까지 함께.",
    tags: ["교안 설계", "커리큘럼", "과제 피드백", "멘토링"],
    tone: "primary",
  },
]

export type Category = "corp" | "plan" | "mentor" | "tutor"

export type Activity = {
  date: string
  org: string
  topic: string
  cat: Category
  role: string
}

export const categoryTabs: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "corp", label: "기업 교육" },
  { value: "plan", label: "교안 제작" },
  { value: "mentor", label: "멘토링" },
  { value: "tutor", label: "과외 · 특강" },
]

export const activities: Activity[] = [
  // 기업 교육 / 기술 튜터
  { date: "26.05", org: "카카오페이", topic: "중간 리더 교육", cat: "corp", role: "기술튜터" },
  { date: "26.05", org: "조선일보", topic: "리더십 대상 PBL 교육", cat: "corp", role: "강사" },
  { date: "26.05", org: "포스코인터내셔널", topic: "26년 바이브코딩 교육 초급 과정", cat: "corp", role: "기술튜터" },
  { date: "26.04~05", org: "포스코인터내셔널", topic: "26년 바이브코딩 교육 중급 과정", cat: "corp", role: "강사" },
  { date: "26.04", org: "신세계DF", topic: "라이브 스트리밍 Gemini 활용 강의", cat: "corp", role: "강사" },
  { date: "26.04", org: "에스씨케이", topic: "이미지·영상 생성 및 바이브코딩 교육", cat: "corp", role: "기술튜터" },
  { date: "26.04", org: "리얼게인", topic: "생성형 AI 리터러시 교육", cat: "corp", role: "기술튜터" },
  { date: "26.03~04", org: "포스코그룹", topic: "AI 활용 전문가 과정", cat: "corp", role: "기술튜터·멘토" },
  { date: "26.03", org: "롯데지주", topic: "임원 AI 과정", cat: "corp", role: "기술튜터" },
  { date: "26.03", org: "현대카드", topic: "승진자 대상 바이브코딩 교육", cat: "corp", role: "기술튜터" },
  { date: "26.03", org: "셀트리온제약", topic: "생성형 AI 교육", cat: "corp", role: "기술튜터" },
  { date: "26.03", org: "모트렉스", topic: "개발자 대상 Cursor AI 교육", cat: "corp", role: "기술튜터" },
  { date: "26.03", org: "HDC 아이파크몰", topic: "생성형 AI 툴 교육", cat: "corp", role: "기술튜터" },
  { date: "26.01", org: "DORO", topic: "금천구청 AI 로봇 캠프 강의", cat: "corp", role: "보조강사" },
  { date: "25.12", org: "디딤돌 법무사무소", topic: "Gemini & NotebookLM 기능 소개 및 활용법", cat: "corp", role: "AI 활용 교육" },
  // 교안 제작 / 교육 설계
  { date: "26.05", org: "삼성인력개발원", topic: "임원 AX 교육 교안 제작 / 대시보드 구성", cat: "plan", role: "교안 설계" },
  { date: "26.05", org: "조선일보", topic: "리더십 대상 PBL 교육 교안 작업", cat: "plan", role: "교안 작업" },
  { date: "26.05", org: "녹십자홀딩스", topic: "준법지원실 대상 커리큘럼 작성", cat: "plan", role: "커리큘럼" },
  { date: "26.04~05", org: "타임폴리오", topic: "교육 교안 작업", cat: "plan", role: "교안 작업" },
  { date: "26.04~05", org: "포스코인터내셔널", topic: "바이브코딩 교육 교안 작업", cat: "plan", role: "교안 작업" },
  { date: "26.04", org: "한국투자증권", topic: "PB/WM 대상 AI 활용 교안 작업", cat: "plan", role: "교안 작업" },
  { date: "26.04", org: "농심", topic: "AI 교육 교안 작업", cat: "plan", role: "교안 작업" },
  { date: "26.03~04", org: "HD현대 / HD현대중공업", topic: "AI Frontier 양성 과정 교안 수정·초안", cat: "plan", role: "교안 작업" },
  { date: "26.03", org: "코오롱", topic: "AI 교육 교안 제작", cat: "plan", role: "교안 설계" },
  // 멘토링 / 코칭 / 피드백
  { date: "26.05", org: "SKT", topic: "AI 기반 정책 Simulator 멘토링", cat: "mentor", role: "멘토링" },
  { date: "26.05", org: "팀스파르타", topic: "강의 만족도 조사 뷰어 개발", cat: "mentor", role: "개발" },
  { date: "26.03", org: "포스코그룹", topic: "미니프로젝트 안내", cat: "mentor", role: "멘토링" },
  { date: "26.03", org: "포스코그룹", topic: "과제기획서 피드백", cat: "mentor", role: "피드백" },
  { date: "26.03", org: "포스코그룹", topic: "수강생 멘토링", cat: "mentor", role: "멘토링" },
  { date: "25.11", org: "SeSAC", topic: "선배 멘토 활동", cat: "mentor", role: "멘토링" },
  // 개인 과외 / 소규모 / 특강
  { date: "26.04", org: "AI 강사 커뮤니티", topic: "AI 강사 네트워킹 / 교육 콘텐츠 사례 공유", cat: "tutor", role: "참여" },
  { date: "26.04", org: "특강", topic: "“AI가 잘할 수밖에 없도록 일을 맡기는 방법”", cat: "tutor", role: "강사" },
  { date: "26.03", org: "Peaches", topic: "OpenClaw 설치 및 인스타 자동화 프로그램 설계", cat: "tutor", role: "컨설팅" },
  { date: "26.03", org: "렌탈클리닉", topic: "AI 활용 과외 / Claude Cowork·업무 자동화 설계", cat: "tutor", role: "과외" },
  { date: "26.02", org: "개인 과외", topic: "OpenClaw 세팅", cat: "tutor", role: "과외" },
  { date: "26.02", org: "개인 과외", topic: "바이브코딩 과외", cat: "tutor", role: "과외" },
  { date: "26.01", org: "개인 컨설팅", topic: "취업 컨설팅", cat: "tutor", role: "컨설팅" },
  { date: "26.01", org: "개인 과외", topic: "아이패드·노션 과외", cat: "tutor", role: "과외" },
  { date: "26.01", org: "개인 과외", topic: "바이브코딩 과외", cat: "tutor", role: "과외" },
]

export type BadgeTone = "brand" | "tech" | "default" | "secondary" | "outline"

export function roleBadgeVariant(role: string): BadgeTone {
  if (role.includes("강사")) return "brand"
  if (role.includes("튜터")) return "tech"
  if (role.includes("교안") || role.includes("커리큘럼") || role.includes("설계"))
    return "default"
  if (role.includes("멘토") || role.includes("피드백") || role.includes("컨설팅"))
    return "secondary"
  return "outline"
}

export type Project = {
  period: string
  title: string
  org: string
  award?: string
}

export const projects: Project[] = [
  { period: "2025. 07 ~ 2025. 09", title: "ERP 데이터 기반 AI Agent", org: "버티컬바" },
  { period: "2024. 09 ~ 2025. 02", title: "SeSAC 프로젝트 모집 웹사이트 / SeMO", org: "SeSAC" },
  { period: "2023. 07 ~ 2024. 06", title: "객체 탐지 AI 개발", org: "리버트론" },
  { period: "2023. 05 ~ 2023. 07", title: "AI 로봇 개발", org: "리버트론" },
  { period: "2022. 12 ~ 2023. 02", title: "이미지 편집 AI / 잘나왔닷", org: "SKT FLY AI" },
  {
    period: "2022. 01 ~ 2022. 09",
    title: "AI 자동 수확 농업용 로봇",
    org: "한국대학발명협회",
    award: "대통령상",
  },
]

/** Deterministic 7-month activity heatmap (30 weeks x 7 days), denser over time. */
export const heatmapMonths = ["2025.11", "12", "2026.01", "02", "03", "04", "05"]

export function buildHeatmap(weeks = 30): number[][] {
  const cols: number[][] = []
  for (let w = 0; w < weeks; w++) {
    const col: number[] = []
    for (let d = 0; d < 7; d++) {
      const r = ((w * 31 + d * 7) % 11) / 10
      const busy = w / (weeks - 1)
      let lvl = Math.min(4, Math.round(busy * 2.6 + r * 1.8))
      if (w < 6 && r < 0.55) lvl = Math.max(0, lvl - 2)
      col.push(lvl)
    }
    cols.push(col)
  }
  return cols
}

export const heatmapColors = ["#eceef0", "#c3c0ff", "#7671ff", "#4f46e5", "#0f0069"]
