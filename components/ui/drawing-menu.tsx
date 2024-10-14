"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Icons } from "./icons"

type Props = {
  clearDrawings: () => void
  selectedColor: string
  setColor: (color: string) => void
}

const COLORS = [
  "#000000", // Black (Tailwind: bg-black)
  "#FFFFFF", // White (Tailwind: bg-white)
  "#EF4444", // Red (Tailwind: bg-red-500)
  "#3B82F6", // Blue (Tailwind: bg-blue-500)
  "#22C55E", // Green (Tailwind: bg-green-500)
  "#EAB308", // Yellow (Tailwind: bg-yellow-500)
  "#FB923C", // Orange (Tailwind: bg-orange-500)
  "#A855F7" // Purple (Tailwind: bg-purple-500)
]

export function DrawingMenu({ clearDrawings, selectedColor, setColor }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent dark:text-muted"
        >
          <Icons.menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={-5} className="space-y-1">
        {COLORS.map((color, index) => (
          <DropdownMenuItem
            asChild
            key={index}
            data-highlighted={color === selectedColor}
            className="hover:bg-primary/25 hover:dark:bg-primary-foreground/25 data-[highlighted=true]:bg-primary/25 data-[highlighted=true]:dark:bg-primary-foreground/25"
          >
            <button
              onClick={() => setColor(color)}
              data-color={color}
              className="size-5 rounded-full data-[color=#FFFFFF]:border data-[color=#FFFFFF]:dark:border-border/30 data-[color=#FFFFFF]:border-primary/30"
              style={{ backgroundColor: color }}
            />
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="hover:bg-primary/25 hover:dark:bg-primary-foreground/25 h-max"
            onClick={clearDrawings}
          >
            <Icons.circleX className="size-5 p-0 text-primary dark:text-primary-foreground" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
