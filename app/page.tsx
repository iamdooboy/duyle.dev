'use client'

import React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { projectConfig } from '@/config/project'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { CardSpotlight } from '@/components/card-spotlight'
import { Icons } from '@/components/icons'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const bgPattern =
    theme === 'dark' ? (
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] opacity-50 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_0%,transparent_80%)]'></div>
    ) : (
      <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_0%,transparent_80%)]'></div>
    )
  console.log(theme)

  return (
    <div className='mx-auto max-w-xl py-8'>
      {bgPattern}
      <header className='sticky z-50 w-full'>
        <div className='flex items-center justify-between py-4'>
          <a className='flex items-center space-x-2' href='/'>
            <div className='flex flex-col space-y-1 text-sm leading-none'>
              <span className='text-lg font-bold dark:text-neutral-100'>
                Duy Le
              </span>
              <span className='dark:text-neutral-100'>
                Full Stack Developer
              </span>
            </div>
          </a>
          <div className='flex items-center space-x-1'>
            <Link href='/' target='_blank' rel='noreferrer'>
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0 text-black dark:text-white'
                )}
              >
                <Icons.gitHub className='h-5 w-5' />
                <span className='sr-only'>GitHub</span>
              </div>
            </Link>
            {/* <ModeToggle
                theme={theme}
                setTheme={setTheme}
                setPreview={setPreview}
              /> */}
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className='space-y-2 pt-5'>
        <p className='leading-7 dark:text-neutral-100 [&:not(:first-child)]:mt-6 '>
          Crafting UIs with React since 2019. Passionate about interface design
          and attention to detail, striving to create great experiences. Love
          creating high quality and fun products.
        </p>
        <div className='pb-2 pt-5 font-mono font-semibold dark:text-neutral-100'>
          Projects
        </div>
        <div className='space-y-3'>
          {projectConfig.map((project) => (
            <CardSpotlight key={project.title} {...project} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  )
}
