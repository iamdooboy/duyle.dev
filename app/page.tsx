'use client'

import Link from 'next/link'

import { projectConfig } from '@/config/project'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/badge'
import { CardSpotlight } from '@/components/card-spotlight'
import { InfiniteCarousel } from '@/components/infinite-scroll'

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
          <CardSpotlight key={project.title}>
            <Link href={project.url}>
              <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
                <div className='space-y-1'>
                  <CardTitle className='font-mono underline-offset-4'>
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-muted-foreground flex text-sm'>
                  <div className='flex gap-4'>
                    {project.stack.length <= 4 ? (
                      project.stack.map((stack) => (
                        <Badge key={stack} stack={stack} />
                      ))
                    ) : (
                      <InfiniteCarousel>
                        {project.stack.map((stack) => (
                          <Badge key={stack} stack={stack} />
                        ))}
                      </InfiniteCarousel>
                    )}
                  </div>
                </div>
              </CardContent>
            </Link>
          </CardSpotlight>
        ))}
      </div>
    </div>
  )
}
