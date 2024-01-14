'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()
  return (
    <nav className='text-md flex items-center justify-evenly gap-6'>
      <Link
        href='/blog'
        className={cn(
          'underline-offset-8 transition-colors hover:underline',
          pathname === '/blog' ? 'underline' : 'text-primary'
        )}
      >
        Blog
      </Link>
      <Link
        href='/projects'
        className={cn(
          'underline-offset-8 transition-colors hover:underline',
          pathname === '/projects' ? 'underline' : 'text-primary'
        )}
      >
        Project
      </Link>
    </nav>
  )
}
