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
        {/* <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        > */}
        <div className='absolute inset-0 dark:bg-dot-white/[0.1] bg-dot-black/[0.1]'>
          <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]'></div>
          <div className='mx-auto max-w-xl py-8'>
            <Navbar />
            {children}
          </div>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
