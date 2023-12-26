import { cn } from '@/lib/utils'

import '@/styles/globals.css'

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Duy Le',
  description:
    'Minimalistic portfolio website built with Next.js, shadcn/ui, and Tailwind CSS.',
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
          'flex min-h-screen flex-col antialiased',
          GeistSans.className
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
