// 'use client'

// import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
// import { Moon, Sun } from 'lucide-react'
// import { useTheme } from 'next-themes'

// import { cn } from '@/lib/utils'
// import { buttonVariants } from '@/components/ui/button'

// export function ModeToggle() {
//   const [effect, setEffect] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const { theme, setTheme } = useTheme()

//   React.useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) {
//     return null
//   }

//   return (
//     <button
//       className={cn(
//         buttonVariants({
//           variant: 'ghost',
//         }),
//         `${effect && 'animate-jiggle'} h-8 w-8 px-0 text-black dark:text-white`
//       )}
//       onClick={() => {
//         if (theme === 'light') {
//           setTheme('dark')
//         } else {
//           setTheme('light')
//         }
//         setEffect(true)
//       }}
//       onAnimationEnd={() => setEffect(false)}
//     >
//       <span className='sr-only'>Toggle mode</span>
//       {theme === 'light' ? (
//         <Sun className={`h-5 w-5`} />
//       ) : (
//         <Moon className={`h-5 w-5`} />
//       )}
//     </button>
//   )
// }

'use client'

import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Laptop2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <Tabs
      defaultValue='dark'
      className='w-[400px]'
      onValueChange={(value) => {
        if (value === 'light') {
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}
    >
      <TabsList>
        <TabsTrigger value='light'>
          <Sun className={`h-5 w-5`} />
        </TabsTrigger>
        <TabsTrigger value='dark'>
          <Moon className={`h-5 w-5`} />
        </TabsTrigger>
        {/* <TabsTrigger value='system'>
          <Laptop2 className={`h-5 w-5`} />
        </TabsTrigger> */}
      </TabsList>
    </Tabs>
  )
}
