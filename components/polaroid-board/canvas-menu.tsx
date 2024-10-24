import React, { useState } from "react"
import { DRAWING_COLORS } from "@/lib/constants"
import { Icons } from "@/ui/icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

type Props = {
  clearDrawings: () => void
  selectedColor: string
  setColor: (color: string) => void
}

export const CanvasMenu = ({
  clearDrawings,
  selectedColor,
  setColor
}: Props) => {
  const [value, setValue] = useState([16])

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
  }

  const onClickHandler = (type: string) => {
    switch (type) {
      case "undo":
        return
      case "redo":
        return
      case "eraser":
        setColor("eraser")
        return
      case "trash":
        clearDrawings()
        return
    }
  }
  const circleSize = value[0] * 1.1

  return (
    <div className="flex gap-2 items-center w-full justify-evenly divide-x my-2 sm:my-0">
      <div className="flex gap-1 items-center w-full justify-evenly">
        {DRAWING_COLORS.map((color, index) => (
          <button
            onClick={() => setColor(color)}
            key={index}
            data-highlighted={color === selectedColor}
            className="p-1 rounded hover:bg-primary/15 hover:dark:bg-primary-foreground/15 data-[highlighted=true]:bg-primary/15 data-[highlighted=true]:dark:bg-primary-foreground/15 justify-center flex"
          >
            <div
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
          if (icon === "circleDot") {
            return (
              <Popover key={icon}>
                <PopoverTrigger className="p-1 rounded hover:bg-primary/15 hover:dark:bg-primary-foreground/15 data-[state=open]:bg-primary/15 data-[state=open]:dark:bg-primary-foreground/15 justify-center flex">
                  <Icon className="size-5" />
                </PopoverTrigger>
                <PopoverContent align="end" className="w-max flex gap-1">
                  <div className="w-24 flex flex-col justify-center items-center gap-2">
                    <Slider
                      defaultValue={value}
                      max={40}
                      min={8}
                      step={8}
                      onValueChange={handleValueChange}
                    />
                    <div className="flex justify-center items-center h-max aspect-square size-14">
                      <div
                        className="rounded-full bg-primary transition-all duration-200 ease-in-out"
                        style={{
                          width: `${circleSize}px`,
                          height: `${circleSize}px`
                        }}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
          return (
            <button
              key={index}
              onClick={() => onClickHandler(icon)}
              data-highlighted={icon === selectedColor}
              className="p-1 rounded hover:bg-primary/15 hover:dark:bg-primary-foreground/15 data-[highlighted=true]:bg-primary/15 data-[highlighted=true]:dark:bg-primary-foreground/15 justify-center flex"
            >
              <Icon className="size-5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
