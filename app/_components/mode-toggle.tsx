"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { cn } from '@/lib/utils'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap hover:opacity-80 px-3"
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 size-5" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 size-5" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
