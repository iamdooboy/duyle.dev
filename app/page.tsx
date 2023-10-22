import type { ComponentPropsWithoutRef } from 'react'
import { CardSpotlight } from '@/components/card-spotlight'
import { projectConfig } from './config/project'

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
	return (
		<div className='space-y-2'>
			<p className='leading-7 [&:not(:first-child)]:mt-6'>
				Crafting UIs with React since 2016. Passionate about interface design
				and attention to detail, striving to create great experiences.
			</p>
			<div className='text-lg font-semibold'>Projects</div>
			{projectConfig.map(project => (
				<CardSpotlight {...project} />
			))}
		</div>
	)
}
