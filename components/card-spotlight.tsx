'use client'
import React, { useRef, useState } from 'react'

import {
	ChevronDownIcon,
	CircleIcon,
	PlusIcon,
	StarIcon
} from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/ui/card'

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/ui/dropdown-menu'
import { Separator } from '@/ui/separator'
import { ProjectConfig } from '@/types'

import { useTheme } from 'next-themes'

export function CardSpotlight({ ...project }: ProjectConfig) {
	const divRef = useRef<HTMLDivElement>(null)
	const [isFocused, setIsFocused] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [opacity, setOpacity] = useState(0)
	const { theme } = useTheme()

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
		theme === 'dark' ? 'rgba(255, 182, 255, 0.1)' : 'rgba(20, 105, 124, 0.05)'

	return (
		<Card
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className='overflow-hidden relative'
		>
			<div
				className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
				style={{
					opacity,
					background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${backgroundColor}, transparent 40%)`
				}}
			/>
			<CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
				<div className='space-y-1'>
					<CardTitle>{project.title}</CardTitle>
					<CardDescription>{project.description}</CardDescription>
				</div>
				<div className='flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground'>
					<Button variant='secondary' className='px-3 shadow-none'>
						<StarIcon className='mr-2 h-4 w-4' />
						Star
					</Button>
					<Separator orientation='vertical' className='h-[20px]' />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='secondary' className='px-2 shadow-none'>
								<ChevronDownIcon className='h-4 w-4 text-secondary-foreground' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							alignOffset={-5}
							className='w-[200px]'
							forceMount
						>
							<DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>
								Future Ideas
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<PlusIcon className='mr-2 h-4 w-4' /> Create List
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent>
				<div className='flex space-x-4 text-sm text-muted-foreground'>
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
