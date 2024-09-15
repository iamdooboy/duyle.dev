import "./global.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { GradientBackground } from "./_components/background/background"
import { Particles } from "./_components/background/particles"
import Footer from "./_components/footer"
import { Navbar } from "./_components/header/navbar"
import { ThemeProvider } from "./_components/theme-provider"
import { metaData } from "./config"

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`
  },
  description: metaData.description,
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico"
  }
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ")

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="RSS Feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="Atom Feed"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="/feed.json"
          title="JSON Feed"
        />
        <body className="mx-auto max-w-xl px-6 antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="relative mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
              <Navbar />
              {children}
              <Footer />
              <Analytics />
              <SpeedInsights />
            </main>
            <Particles
              className="-z-10 absolute inset-0"
              quantity={100}
              ease={90}
              size={0.25}
              staticity={100}
            />
            <GradientBackground />
          </ThemeProvider>
        </body>
      </head>
    </html>
  )
}
