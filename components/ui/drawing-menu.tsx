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
        <Button variant="ghost" size="icon">
          <Icons.menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={-5} className="space-y-1">
        {COLORS.map((color, index) => (
          <DropdownMenuItem
            key={index}
            data-highlighted={color === selectedColor}
            className="data-[highlighted=true]:bg-primary/15"
          >
            <button
              onClick={() => setColor(color)}
              data-color={color}
              className="size-5 rounded-full data-[color=#FFFFFF]:border"
              style={{ backgroundColor: color }}
            />
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="h-max" onClick={clearDrawings}>
            <Icons.circleX className="size-5 p-0" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
