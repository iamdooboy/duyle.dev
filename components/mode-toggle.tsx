'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button, buttonVariants } from '@/ui/button'
import { cn } from '@/lib/utils'

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<div
			className={cn(
				buttonVariants({
					variant: 'ghost'
				}),
				'w-8 px-0 h-8'
			)}
		>
			<button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
				<span className='sr-only'>Toggle mode</span>
				{theme === 'light' ? (
					<Sun className='h-4 w-4' />
				) : (
					<Moon className='h-4 w-4' />
				)}
			</button>
		</div>
	)
}
