'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [effect, setEffect] = React.useState(false)

  const toggleTheme = (theme: string) => {
    setEffect(true)
    setTheme(theme)
  }

  return (
    <button
      className={cn(
        buttonVariants({
          variant: 'ghost',
        }),
        `${effect && 'animate-jiggle'} h-8 w-8 px-0 text-black dark:text-white`
      )}
      onAnimationEnd={() => setEffect(false)}
    >
      <div
        className='flex h-8 w-8 items-center justify-center dark:hidden'
        onClick={() => toggleTheme('dark')}
      >
        <Sun className='h-5 w-5' />
      </div>
      <div
        className='hidden h-8 w-8 items-center justify-center dark:inline-flex'
        onClick={() => toggleTheme('light')}
      >
        <Moon className='h-5 w-5' />
      </div>
    </button>
  )
}
