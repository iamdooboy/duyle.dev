"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DRAWING_COLORS } from "@/lib/constants"
import { Icons } from "@/ui/icons"

type Props = {
  clearDrawings: () => void
  selectedColor: string
  setColor: (color: string) => void
}

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
        {DRAWING_COLORS.map((color, index) => (
          <DropdownMenuItem
            key={index}
            data-highlighted={color === selectedColor}
            className="hover:bg-primary/25 hover:dark:bg-primary-foreground/25 data-[highlighted=true]:bg-primary/15 data-[highlighted=true]:dark:bg-primary-foreground/15"
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
