'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { ProjectConfig } from '@/types'
import clsx from 'clsx'
import { Circle } from 'lucide-react'
import { InfiniteCarousel } from './infinite-scroll'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CardSpotlight({ ...project }: ProjectConfig) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div className='relative overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-0 overflow-hidden rounded-lg opacity-0 transition duration-300'
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(224, 224, 224, 0.15), transparent 40%)`,
        }}
      />
      <div
        ref={divRef}
        className='pointer-events-none absolute left-0 top-0 z-10 h-full w-full cursor-default rounded-lg bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none'
        style={{
          border: `1px solid rgba(224, 224, 224, 0.6)`,
          opacity,
          WebkitMaskImage: `radial-gradient(30% 70px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
      />
      <Card
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='overflow-hidden'
      >
        <Link href={project.url}>
          <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
            <div className='space-y-1'>
              <CardTitle className='font-mono underline-offset-4'>
                {project.title}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </div>
          </CardHeader>
        </Link>
        <CardContent>
          <div className='text-muted-foreground flex space-x-4 text-sm'>
            <InfiniteCarousel>


            {project.stack.map((stack) => (
              // <span className=' flex me-2 items-center px-2 py-0.5 font-semibold rounded-md text-xs font-mono border-accent border text-foreground'>
              //   <svg
              //     role='img'
              //     viewBox='0 0 24 24'
              //     xmlns='http://www.w3.org/2000/svg'
              //     className='w-4 h-4'
              //   >
              //     <title>Next.js</title>
              //     <path d='M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z' />
              //   </svg>
              //   <span className='ml-2 capitalize'>Next.js</span>
              // </span>
              <div key={stack} className='flex items-center'>
                <Circle
                  className={clsx(
                    'mr-1 h-3 w-3 fill-current',
                    stack === 'Supabase' && 'text-[#3FCF8E]',
                    stack === 'Tailwind CSS' && 'text-[#06B6D4]',
                    stack === 'Typescript' && 'text-[#3178C6]',
                    stack === 'React' && 'text-[#61DAFB]',
                    stack === 'MongoDB' && 'text-[#47A248F]'
                  )}
                />
                <span className='text-xs'>{stack}</span>
              </div>
            ))}
              </InfiniteCarousel>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
