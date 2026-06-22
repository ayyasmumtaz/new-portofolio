import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from './providers'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Ayyas Mumtaz Yudha — Software Developer Portfolio",
    template: "%s | Ayyas Mumtaz Yudha",
  },
  description:
    "Portfolio of Ayyas Mumtaz Yudha — a Software Developer based in Jakarta, Indonesia. Explore projects, skills, and experience in web development.",
  keywords: [
    "Ayyas Mumtaz Yudha",
    "Software Developer",
    "Portfolio",
    "Web Developer",
    "Jakarta",
    "Indonesia",
    "Frontend Developer",
    "Full Stack Developer",
  ],
  authors: [{ name: "Ayyas Mumtaz Yudha" }],
  creator: "Ayyas Mumtaz Yudha",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Ayyas Mumtaz Yudha — Software Developer Portfolio",
    description:
      "Portfolio of Ayyas Mumtaz Yudha — a Software Developer based in Jakarta, Indonesia. Explore projects, skills, and experience.",
    siteName: "Ayyas Mumtaz Yudha Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Ayyas Mumtaz Yudha — Software Developer Portfolio",
    description:
      "Portfolio of Ayyas Mumtaz Yudha — a Software Developer based in Jakarta, Indonesia.",
    creator: "@ayyasmumtaz",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
