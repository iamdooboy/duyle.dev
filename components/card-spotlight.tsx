'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { ProjectConfig } from '@/types'
import clsx from 'clsx'
import { Circle } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Badge } from './badge'

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
          <div className='text-muted-foreground flex space-x-2 text-sm'>
            {project.stack.map((stack) => (
              <Badge stack={stack} />

              // <div key={stack} className='flex items-center'>
              //   <Circle
              //     className={clsx(
              //       'mr-1 h-2 w-2 fill-current',
              //       stack === 'Supabase' && 'text-[#3FCF8E]',
              //       stack === 'Tailwind CSS' && 'text-[#06B6D4]',
              //       stack === 'Typescript' && 'text-[#3178C6]',
              //       stack === 'React' && 'text-[#61DAFB]',
              //       stack === 'MongoDB' && 'text-[#47A248F]'
              //     )}
              //   />
              //   <span className='text-xs'>{stack}</span>
              // </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
