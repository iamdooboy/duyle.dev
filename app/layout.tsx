import { cn } from '@/lib/utils'

import '@/styles/globals.css'

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import { Navbar } from '@/components/navbar'
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
      <body
        className={cn(
          'flex min-h-screen flex-col antialiased',
          GeistSans.className
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <div className='bg-background container mx-auto w-full max-w-xl py-8'>
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
