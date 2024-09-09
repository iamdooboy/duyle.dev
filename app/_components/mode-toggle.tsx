"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 hover:opacity-80"
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="dark:-rotate-90 size-5 rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
