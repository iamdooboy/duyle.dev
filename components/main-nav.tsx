import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { ModeToggle } from './mode-toggle'
import { Button, buttonVariants } from './ui/button'

export function MainNav() {
  return (
    <>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        {/* <Icons.logo className='h-6 w-6' /> */}
        <span className='text-xl font-extrabold dark:text-neutral-100'>
          Duy Le
        </span>
      </Link>
      <div className='flex items-center justify-evenly space-x-3'>
        <div>
          <Link href='/blog'>
            <Button variant='link' className='text-md'>
              Blog
            </Button>
          </Link>
          <Link href='/blog'>
            <Button variant='link' className='text-md'>
              Project
            </Button>
          </Link>
        </div>
        <Link href='/' target='_blank' rel='noreferrer'>
          <div
            className={cn(
              buttonVariants({
                variant: 'ghost',
              }),
              'h-8 w-8 px-0 text-black dark:text-white'
            )}
          >
            <Icons.gitHub className='h-5 w-5' />
            <span className='sr-only'>GitHub</span>
          </div>
        </Link>
        <ModeToggle />
      </div>
    </>
  )
}
