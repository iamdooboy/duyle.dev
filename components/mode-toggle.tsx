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
				'w-8 h-8 px-0 dark:text-white text-black'
			)}
			onClick={() => {
				let preview
				if (theme === 'light') {
					setTheme('dark')
					preview = (
						<div className='relative h-full w-full bg-[#000000]'>
							<div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
						</div>
					)
				} else {
					setTheme('light')
					preview = (
						<div className='relative h-full w-full bg-white'>
							<div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
						</div>
					)
				}

				setPreview(preview)
			}}
		>
			<span className='sr-only'>Toggle mode</span>
			{theme === 'light' ? (
				<Sun className='h-5 w-5' />
			) : (
				<Moon className='h-5 w-5' />
			)}
		</button>
	)
}
