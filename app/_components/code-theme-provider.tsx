"use client"
import { useTheme } from "next-themes"

export function CodeThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return <div data-theme={theme}>{children as any}</div>
}
