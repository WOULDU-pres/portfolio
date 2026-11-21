import {
  BookOpenText,
  Building2,
  ChartNoAxesCombined,
  CodeXml,
  Database,
  Lightbulb,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react"

import calendarActivities from "./calendar-activities.json"
import calendarCurriculum from "./calendar-curriculum.json"
import clientLogos from "./client-logos.json"
import extraOrgLogos from "./org-logos.json"

export const calendarUpdatedAt = "2026-11-21"
export const activityStartDate = "2025-11-01"

export const clients: { name: string; logo: string }[] = clientLogos
// Timeline-only logos: organisations kept out of the client logo wall.
export const orgLogos: { name: string; logo: string }[] = [
  ...clientLogos,
  ...extraOrgLogos,
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

export type Category = "education" | "mentoring" | "recorded"

export const categoryLabels: Record<Category, string> = {
  education: "교육",
  mentoring: "멘토링",
  recorded: "녹화 강의",
}

export type EducationType =
  | "literacy"
  | "vibe"
  | "data"
  | "llm"
  | "mentoring"
  | "curriculum"
  | "recorded"

export type EducationProgram = {
  id: EducationType
  title: string
  label: string
  icon: LucideIcon
  image: string
  desc: string
  examples: string[]
  caseStudy?: { org: string; period: string; topic: string }
}

export const educationPrograms: EducationProgram[] = [
  {
    id: "literacy",
    title: "AI 리터러시 · 업무 활용",
    label: "AI 리터러시",
    icon: Lightbulb,
    image: "/education/literacy-v2.jpg",
    desc: "생성형 AI의 원리와 한계를 이해하고, 직무에 맞는 프롬프트와 도구 활용을 익힙니다.",
    examples: ["ChatGPT Work", "Gemini · Claude", "NotebookLM"],
  },
  {
    id: "vibe",
    title: "바이브코딩",
    label: "바이브코딩",
    icon: CodeXml,
    image: "/education/vibe-v2.jpg",
    desc: "AI와 함께 웹앱과 업무 도구를 만들고, 반복 업무는 노코드·로우코드 자동화로 직접 구현합니다.",
    examples: ["Cursor AI", "웹앱 · 업무 도구", "업무 자동화"],
    caseStudy: {
      org: "한국지역난방공사",
      period: "2026.07",
      topic: "노코드·로우코드 기반 자동화 구현 실습 및 업무 자동화 고도화",
    },
  },
  {
    id: "data",
    title: "데이터 분석 · 머신러닝",
    label: "데이터 · 머신러닝",
    icon: ChartNoAxesCombined,
    image: "/education/data-v2.jpg",
    desc: "실무 데이터 분석과 시각화부터 예측 모델의 학습·평가, AI 서비스 구현까지 다룹니다.",
    examples: ["분석 · 시각화", "예측 모델", "AI 서비스 구현"],
    caseStudy: {
      org: "한국지역난방공사",
      period: "2026.09",
      topic: "고장 예측 모델 구현·고도화 및 AI 시스템 설계",
    },
  },
  {
    id: "llm",
    title: "LLM · RAG 응용 개발",
    label: "LLM · RAG",
    icon: Database,
    image: "/education/llm-v2.jpg",
    desc: "LLM 활용과 검색 증강 생성(RAG) 구조를 이해하고, 업무 데이터와 문서를 활용하는 AI 애플리케이션을 설계합니다.",
    examples: ["LLM 활용", "RAG 구조", "문서 기반 질의응답"],
    caseStudy: {
      org: "한국지역난방공사",
      period: "2026.06",
      topic: "생성형 AI 활용 고도화 및 LLM 기반 업무 적용",
    },
  },
  {
    id: "mentoring",
    title: "AI 프로젝트 멘토링",
    label: "프로젝트 멘토링",
    icon: Users,
    image: "/education/mentoring-v2.jpg",
    desc: "현업 과제 정의부터 기획·구현 피드백과 성과 발표까지, 팀이 직접 완성하도록 코칭합니다.",
    examples: ["과제 정의", "기획 · 구현 피드백", "성과 발표 코칭"],
  },
  {
    id: "curriculum",
    title: "교안 · 커리큘럼 제작",
    label: "교안 제작",
    icon: BookOpenText,
    image: "/education/curriculum-v2.jpg",
    desc: "기업별 교육 교안과 커리큘럼, 실습 자료, 교안 템플릿을 설계·제작합니다.",
    examples: ["기업별 교안", "커리큘럼 설계", "교안 템플릿"],
  },
]

export type Activity = {
  id: string
  date: string
  lastDate: string
  dates: string[]
  org: string
  topic: string
  cat: Category
  // Empty when the topic is unconfirmed; several when one course spans them.
  types: EducationType[]
  // Mentored team projects, listed under the course in the mentoring tab.
  projects?: string[]
}

export const categoryTabs: { value: EducationType | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  ...educationPrograms.map((program) => ({
    value: program.id,
    label: program.label,
  })),
]

function formatActivityPeriod(dates: string[]): string {
  const first = dates[0].slice(2, 7).replace("-", ".")
  const last = dates[dates.length - 1].slice(2, 7).replace("-", ".")
  if (first === last) return first
  return `${first}~${first.slice(0, 2) === last.slice(0, 2) ? last.slice(3) : last}`
}

// Only curated work records are shipped; personal events and calendar IDs
// are excluded. Multiple work blocks for the same activity/day are combined.
const recordedActivities: Activity[] = (
  calendarActivities as unknown as Omit<Activity, "date" | "lastDate">[]
)
  .map((activity) => ({
    ...activity,
    date: formatActivityPeriod(activity.dates),
    lastDate: activity.dates[activity.dates.length - 1],
  }))
  .sort(
    (a, b) => b.lastDate.localeCompare(a.lastDate) || a.id.localeCompare(b.id)
  )

export const activities = recordedActivities

export type CurriculumItem = { id: string; org: string; topic: string }
export const curriculumActivities: CurriculumItem[] = calendarCurriculum

export type Project = {
  period: string
  title: string
  org: string
  image: string
  award?: string
}

export const projects: Project[] = [
  {
    period: "2026. 08 ~ 2026. 09",
    title: "교육 운영 서비스",
    image: "/projects/mini-pm.png",
    org: "팀스파르타",
  },
  {
    period: "2026. 08",
    title: "AI 챗봇",
    image: "/projects/airex.png",
    org: "포스코",
  },
  {
    period: "2026. 07 ~ 2026. 08",
    title: "AI 역량 진단 평가",
    image: "/projects/ai-assessment.png",
    org: "팀스파르타",
  },
  {
    period: "2026. 05",
    title: "강의 만족도 조사 뷰어",
    image: "/projects/survey-viewer.png",
    org: "팀스파르타",
  },
  {
    period: "2025. 07 ~ 2025. 09",
    title: "ERP 데이터 기반 AI Agent",
    image: "/projects/erp-agent.png",
    org: "버티컬바",
  },
  {
    period: "2024. 09 ~ 2025. 02",
    title: "SeSAC 프로젝트 모집 웹사이트 / SeMO",
    image: "/projects/semo.png",
    org: "SeSAC",
  },
  {
    period: "2023. 07 ~ 2024. 06",
    title: "객체 탐지 AI 개발",
    image: "/projects/object-detection.png",
    org: "리버트론",
  },
  {
    period: "2023. 05 ~ 2023. 07",
    title: "AI 로봇 개발",
    image: "/projects/ai-robot.png",
    org: "리버트론",
  },
  {
    period: "2022. 12 ~ 2023. 02",
    title: "이미지 편집 AI / 잘나왔닷",
    image: "/projects/image-editing.png",
    org: "SKT FLY AI",
  },
  {
    period: "2022. 01 ~ 2022. 09",
    title: "AI 자동 수확 농업용 로봇",
    image: "/projects/agricultural-robot.png",
    org: "한국대학발명협회",
    award: "대통령상",
  },
]

const DAY_MS = 24 * 60 * 60 * 1000

export type HeatmapDay = {
  date: string
  count: number
  level: number
  inPeriod: boolean
}

export const activityDays = new Map<string, number>()
for (const activity of activities) {
  for (const date of new Set(activity.dates)) {
    activityDays.set(date, (activityDays.get(date) ?? 0) + 1)
  }
}
export const activityDayCount = activityDays.size
export const activityMonthCount =
  (Number(calendarUpdatedAt.slice(0, 4)) -
    Number(activityStartDate.slice(0, 4))) *
    12 +
  Number(calendarUpdatedAt.slice(5, 7)) -
  Number(activityStartDate.slice(5, 7)) +
  1

// Use UTC day arithmetic for date-only values so the graph is independent of
// the deployment server's timezone. Calendar dates were read in Asia/Seoul.
const periodStart = new Date(`${activityStartDate}T00:00:00Z`)
const gridStart = periodStart.getTime() - periodStart.getUTCDay() * DAY_MS
const periodEnd = new Date(`${calendarUpdatedAt}T00:00:00Z`).getTime()

export function buildHeatmap(): HeatmapDay[][] {
  const weeks = Math.ceil((periodEnd - gridStart + DAY_MS) / (7 * DAY_MS))
  return Array.from({ length: weeks }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const date = new Date(gridStart + (week * 7 + day) * DAY_MS)
        .toISOString()
        .slice(0, 10)
      const count = activityDays.get(date) ?? 0
      return {
        date,
        count,
        level: Math.min(4, count),
        inPeriod: date >= activityStartDate && date <= calendarUpdatedAt,
      }
    })
  )
}

export const heatmapMonths = Array.from(
  { length: activityMonthCount },
  (_, index) => {
    const month = new Date(
      Date.UTC(
        periodStart.getUTCFullYear(),
        periodStart.getUTCMonth() + index,
        1
      )
    )
    return {
      label:
        month.getUTCMonth() === 0 || index === 0
          ? `${month.getUTCFullYear()}.${String(month.getUTCMonth() + 1).padStart(2, "0")}`
          : String(month.getUTCMonth() + 1).padStart(2, "0"),
      week: Math.floor((month.getTime() - gridStart) / (7 * DAY_MS)),
    }
  }
)

export const heatmapColors = [
  "#eceef0",
  "#c3c0ff",
  "#7671ff",
  "#4f46e5",
  "#0f0069",
]
