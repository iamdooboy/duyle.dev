'use client'
import React, {
	useState,
	Dispatch,
	SetStateAction,
	ReactNode
} from 'react'
import { Moon, Sun } from 'lucide-react'
import { buttonVariants } from '@/ui/button'
import { cn } from '@/lib/utils'

interface Props {
	setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
	setPreview: Dispatch<SetStateAction<ReactNode>>
	theme: string
}

export function ModeToggle({ theme, setTheme, setPreview }: Props) {
	const [effect, setEffect] = useState(false)
	return (
		<button
			className={cn(
				buttonVariants({
					variant: 'ghost'
				}),
				`${effect && 'animate-jiggle'} w-8 h-8 px-0 dark:text-white text-black`
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
				setEffect(true)
				setPreview(preview)
			}}
			onAnimationEnd={() => setEffect(false)}
		>
			<span className='sr-only'>Toggle mode</span>
			{theme === 'light' ? (
				<Sun className={`h-5 w-5`} />
			) : (
				<Moon className={`h-5 w-5`} />
			)}
		</button>
	)
}
