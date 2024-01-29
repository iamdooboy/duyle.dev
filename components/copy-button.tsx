'use client'

import React from 'react'
import { Check, Share2 } from 'lucide-react'

export function CopyButton() {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText('')
        setHasCopied(true)
      }}
      className='text-muted-foreground flex items-center justify-center p-0 hover:bg-transparent'
    >
      {hasCopied ? (
        <>
          <Check className='mr-2 size-4 ' />
          Copied
        </>
      ) : (
        <>
          <Share2 className='mr-2 size-4 ' />
          Copy link
        </>
      )}
    </button>
  )
}
