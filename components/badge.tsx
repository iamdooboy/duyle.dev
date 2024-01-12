import React from 'react'

import { Icons } from './icons'

export function Badge({ stack }: { stack: string }) {
  let Icon
  if (stack === 'Next.js') {
    Icon = <Icons.nextjs className='w-4 h-4' />
  } else if (stack === 'Tailwind CSS') {
    Icon = <Icons.tailwind className='w-4 h-4' />
  } else if (stack === 'shadcn/ui') {
    Icon = <Icons.shadcn className='w-4 h-4' />
  } else if (stack === 'Typescript') {
    Icon = <Icons.typescript className='w-4 h-4' />
  } else if (stack === 'Supabase') {
    Icon = <Icons.supabase className='w-4 h-4' />
  } else if (stack === 'React') {
    Icon = <Icons.react className='w-4 h-4' />
  }
  return (
    <span className='flex items-center p-1 rounded-md font-mono border-accent border text-foreground min-w-fit'>
      {Icon}
      <p className='ml-2 text-xs'>{stack}</p>
    </span>
  )
}
