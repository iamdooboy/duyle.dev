import React from 'react'

import { Icons } from './icons'

type Props = {
  className?: string
}

type IconsProps = {
  [key: string]: React.FC<Props>
}

const iconMappin: IconsProps = {
  'Next.js': Icons.nextjs,
  'Tailwind CSS': Icons.tailwind,
  'shadcn/ui': Icons.shadcn,
  'Typescript': Icons.typescript,
  'Supabase': Icons.supabase,
  'React': Icons.react,
}

export function Badge({ stack }: { stack: string }) {
  const Icon = iconMappin[stack as keyof Props]
  return (
    <span className='text-foreground flex min-w-fit items-center rounded-md p-1 font-mono'>
      <Icon className='size-4' />
      <p className='ml-2 text-xs'>{stack}</p>
    </span>
  )
}
