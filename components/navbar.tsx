import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav-bar'
import { ModeToggle } from './mode-toggle'
import { Button, buttonVariants } from './ui/button'

export function Navbar() {
  return (
    <header className='sticky z-50 w-full'>
      <div className='flex items-center justify-between'>
        <MainNav />
        {/* <MobileNav /> */}
      </div>
    </header>
  )
}
