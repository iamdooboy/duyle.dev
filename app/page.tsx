'use client'

import { ComponentPropsWithoutRef, useState } from 'react'
import { CardSpotlight } from '@/components/card-spotlight'
import { projectConfig } from './config/project'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Icons } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends ComponentPropsWithoutRef<'a'> {
	label: string
}

function Badge(props: Props) {
	return (
		<a
			{...props}
			target='_blank'
			className='border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline'
		/>
	)
}

export default function Home() {
	const [preview, setPreview] = useState<null | React.ReactNode>(
		<div className='relative h-full w-full bg-white'>
			<div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
		</div>
	)
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	return (
		// <div className='space-y-2'>
		// 	<p className='leading-7 [&:not(:first-child)]:mt-6 dark:text-neutral-100 '>
		// 		Crafting UIs with React since 2019. Passionate about interface design
		// 		and attention to detail, striving to create great experiences.
		// 	</p>
		// 	<div className='text-lg font-semibold dark:text-neutral-100'>
		// 		Projects
		// 	</div>
		// 	{projectConfig.map(project => (
		// 		<CardSpotlight {...project} />
		// 	))}
		// </div>
		<div className={`${theme}`}>
			<div className='fixed left-0 top-0 -z-10 h-full w-full'>{preview}</div>
			<div className='max-w-xl mx-auto py-8'>
				<header className='sticky z-50 w-full'>
					<div className='flex items-center justify-between py-4'>
						<a className='flex items-center space-x-2' href='/'>
							<div className='flex flex-col space-y-1 text-sm leading-none'>
								<span className='text-lg font-bold dark:text-neutral-100'>
									Duy Le
								</span>
								<span className='dark:text-neutral-100 '>
									Full Stack Developer
								</span>
							</div>
						</a>
						<div className='flex items-center space-x-1'>
							<Link href='/' target='_blank' rel='noreferrer'>
								<div
									className={cn(
										buttonVariants({
											variant: 'ghost'
										}),
										'w-8 h-8 px-0 dark:text-white text-black'
									)}
								>
									<Icons.gitHub className='h-5 w-5' />
									<span className='sr-only'>GitHub</span>
								</div>
							</Link>
							<ModeToggle
								theme={theme}
								setTheme={setTheme}
								setPreview={setPreview}
							/>
						</div>
					</div>
				</header>
				<div className='space-y-2'>
					<p className='leading-7 [&:not(:first-child)]:mt-6 dark:text-neutral-100 '>
						Crafting UIs with React since 2019. Passionate about interface
						design and attention to detail, striving to create great
						experiences.
					</p>
					<div className='text-lg font-semibold dark:text-neutral-100'>
						Projects
					</div>
					{projectConfig.map(project => (
						<CardSpotlight {...project} />
					))}
				</div>
			</div>
		</div>
	)
}
