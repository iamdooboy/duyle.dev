'use client'
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button, buttonVariants } from '@/ui/button'
import { cn } from '@/lib/utils'

export function ModeToggle() {
	const [mounted, setMounted] = useState(false)
	const { setTheme, theme } = useTheme()
	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<button
			className={cn(
				buttonVariants({
					variant: 'ghost'
				}),
				'w-8 px-0 h-8'
			)}
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
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
