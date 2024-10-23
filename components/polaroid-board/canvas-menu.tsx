import React from "react"
import { DRAWING_COLORS } from "@/lib/constants"
import { Icons } from "@/ui/icons"

export const CanvasMenu = () => {
  return (
    <div className="flex gap-2 items-center w-full justify-evenly divide-x my-2 sm:my-0">
      <div className="flex gap-1 items-center w-full justify-evenly">
        {DRAWING_COLORS.map((color, index) => (
          <button
            key={index}
            // data-highlighted={color === selectedColor}
            className="p-1 rounded hover:bg-primary/25 hover:dark:bg-primary-foreground/25 data-[highlighted=true]:bg-primary/15 data-[highlighted=true]:dark:bg-primary-foreground/15 justify-center flex"
          >
            <div
              // onClick={() => setColor(color)}
              data-color={color}
              className="size-5 rounded-full data-[color=#FFFFFF]:border data-[color=#FFFFFF]:dark:border-border/30 data-[color=#FFFFFF]:border-primary/30"
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
      </div>
      <div className="pl-2 flex gap-1 items-center w-full justify-evenly">
        {["undo", "redo", "eraser", "trash", "circleDot"].map((icon, index) => {
          const Icon = Icons[icon as keyof typeof Icons]
          return (
            <button
              key={index}
              // data-highlighted={color === selectedColor}
              className="p-1 rounded hover:bg-primary/25 hover:dark:bg-primary-foreground/25 data-[highlighted=true]:bg-primary/15 data-[highlighted=true]:dark:bg-primary-foreground/15 justify-center flex"
            >
              <Icon className="size-5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
