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
  return (
    <div className='space-y-2 pt-5'>
      <p className='leading-7 dark:text-neutral-300 [&:not(:first-child)]:mt-6 '>
        Crafting UIs with React since 2019. Passionate about interface design
        and attention to detail, striving to create great experiences. Love
        creating high quality and fun products.
      </p>
      <div className='pb-2 pt-5 font-mono font-semibold'>
        Projects
      </div>
      <div className='space-y-3'>
        {projectConfig.map((project) => (
          <CardSpotlight key={project.title} {...project} />
        ))}
      </div>
    </div>
  )
}
