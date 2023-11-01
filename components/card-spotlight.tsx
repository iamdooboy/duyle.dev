'use client'

import React, { useRef, useState } from 'react'
import { ProjectConfig } from '@/types'
import { CircleIcon, StarIcon } from '@radix-ui/react-icons'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props extends ProjectConfig {
  theme: 'light' | 'dark'
}

export function CardSpotlight({ theme, ...project }: Props) {
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

  const backgroundColor =
    theme === 'dark' ? 'rgba(94, 106, 210, .25)' : 'rgba(20, 105, 124, 0.07)'

  return (
    <Card
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='relative overflow-hidden'
    >
      <div
        className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${backgroundColor}, transparent 40%)`,
        }}
      />
      <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
        <div className='space-y-1'>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-muted-foreground flex space-x-4 text-sm'>
          <div className='flex items-center'>
            <CircleIcon className='mr-1 h-3 w-3 fill-sky-400 text-sky-400' />
            TypeScript
          </div>
          <div className='flex items-center'>
            <StarIcon className='mr-1 h-3 w-3' />
            20k
          </div>
          <div>{project.year}</div>
        </div>
      </CardContent>
    </Card>
  )
}
