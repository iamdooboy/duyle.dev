import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { ModeToggle } from './mode-toggle'
import { Button, buttonVariants } from './ui/button'

export function Navbar() {
  return (
    <header className='sticky z-50 w-full'>
      <div className='flex items-center justify-between py-4'>
        <a className='flex items-center space-x-2' href='/'>
          <div className='flex flex-col space-y-1 text-sm leading-none'>
            <span className='text-lg font-bold dark:text-neutral-100'>
              Duy Le
            </span>
            <span className='dark:text-neutral-100'>Full Stack Developer</span>
          </div>
        </a>
        <div className='flex items-center justify-evenly space-x-3'>
          <div>
            <Link href='/blog'>
              <Button variant='link' className='text-lg'>
                Blog
              </Button>
            </Link>
            <Link href='/blog'>
              <Button variant='link' className='text-lg'>
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
      </div>
    </header>
  )
}
