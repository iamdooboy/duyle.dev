// 'use client'
// import { useState, useEffect } from 'react'
// import { Moon, Sun } from 'lucide-react'
// import { useTheme } from 'next-themes'
// import { Button, buttonVariants } from '@/ui/button'
// import { cn } from '@/lib/utils'

// export function ModeToggle() {
// 	const [mounted, setMounted] = useState(false)
// 	const { setTheme, theme } = useTheme()
// 	// useEffect only runs on the client, so now we can safely show the UI
// 	useEffect(() => {
// 		setMounted(true)
// 	}, [])

// 	if (!mounted) {
// 		return null
// 	}

// 	return (
// 		<button
// 			className={cn(
// 				buttonVariants({
// 					variant: 'ghost'
// 				}),
// 				'w-8 px-0 h-8'
// 			)}
// 			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
// 		>
// 			<span className='sr-only'>Toggle mode</span>
// 			{theme === 'light' ? (
// 				<Sun className='h-4 w-4' />
// 			) : (
// 				<Moon className='h-4 w-4' />
// 			)}
// 		</button>
// 	)
// }

'use client'
import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	ReactNode
} from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button, buttonVariants } from '@/ui/button'
import { cn } from '@/lib/utils'

interface Props {
	setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
	setPreview: Dispatch<SetStateAction<ReactNode>>
	theme: string
}

export function ModeToggle({ theme, setTheme, setPreview }: Props) {
	return (
		<button
			className={cn(
				buttonVariants({
					variant: 'ghost'
				}),
				'w-8 px-0 h-8'
			)}
			onClick={() => {
				let preview
				if (theme === 'light') {
					setTheme('dark')
					preview = (
						<div className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]' />
					)
				} else {
					setTheme('light')
					preview = (
						<div className='relative h-full w-full bg-white'>
							<div className='absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]' />
						</div>
					)
				}

				setPreview(preview)
			}}
		>
			<span className='sr-only'>Toggle mode</span>
			{theme === 'light' ? (
				<Sun className='h-4 w-4' />
			) : (
				<Moon className='h-4 w-4' />
			)}
		</button>
	)
}
