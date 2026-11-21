import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const TITLE = "주현우 — 기업 AI 교육 강사 포트폴리오"
const DESCRIPTION =
  "기업 AI 교육과 프로젝트 멘토링. AI 리터러시·바이브코딩·업무 자동화·데이터 분석·머신러닝·LLM·RAG 교육, 교안·커리큘럼 제작 및 AI·웹 서비스 개발."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "주현우 포트폴리오",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ko_KR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
