'use client'

import React from 'react'

import { projectConfig } from '@/config/project'
import { CardSpotlight } from '@/components/card-spotlight'

export default function Home() {
  return (
    <div className='space-y-2 pt-5'>
      <p className='leading-7 dark:text-neutral-300 [&:not(:first-child)]:mt-6 '>
        Crafting UIs with React since 2019. Passionate about interface design
        and attention to detail, striving to create great experiences. Love
        creating high quality and fun products.
      </p>
      <div className='pb-2 pt-5 font-mono font-semibold'>Projects</div>
      <div className='space-y-3'>
        {projectConfig.map((project) => (
          <CardSpotlight key={project.title} {...project} />
        ))}
      </div>
    </div>
  )
}
