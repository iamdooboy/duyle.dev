import { cn } from '@/lib/utils'

import "@/styles/globals.css"

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Duy Le',
  description:
    'Minimalistic portfolio website built with Next.js, Shadcn/ui, and Tailwind CSS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
