import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { MainNav } from './main-nav'
import { ModeToggle } from './mode-toggle'
import { buttonVariants } from './ui/button'

export function Navbar() {
  return (
    <header className='sticky z-50 w-full'>
      <div className='flex items-center justify-between'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <span className='text-xl font-extrabold dark:text-neutral-100'>
            Duy Le
          </span>
        </Link>
        <div className='flex items-center justify-evenly gap-4'>
          <MainNav />
          <Link
            href='https://github.com/iamdooboy'
            target='_blank'
            rel='noreferrer'
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'size-8 px-0 text-black dark:text-white'
              )}
            >
              <Icons.gitHub className='size-5' />
              <span className='sr-only'>GitHub</span>
            </div>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
