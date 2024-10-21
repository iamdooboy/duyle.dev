import { CurrentDrawing, Drawings } from "@/lib/types"
import { AnimatedCircularProgressBar } from "@/ui/circular-progress"
import { Point } from "framer-motion"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { DrawingMenu } from "./drawing-menu"
import { Path } from "./path"

const maxLength = 45

type Props = {
  name: string
  setName: (value: string) => void
  message: string
  setMessage: (value: string) => void
  savedDrawings: Drawings
  setSavedDrawings: Dispatch<SetStateAction<Drawings>>
  width?: number
  height?: number
}

export const Canvas = ({
  width = 400,
  height = 400,
  name,
  setName,
  message,
  setMessage,
  savedDrawings,
  setSavedDrawings
}: Props) => {
  const [currentDrawing, setCurrentDrawing] = useState<CurrentDrawing | null>(
    null
  )
  const [isDrawingSession, setIsDrawingSession] = useState(false)
  const [color, setColor] = useState("#000000")

  const svgRef = useRef<SVGSVGElement>(null)

  const startDrawing = (point: Point, pressure: number) => {
    setIsDrawingSession(true)
    setCurrentDrawing({
      color,
      drawing: [[point.x, point.y, pressure]]
    })
  }

  const continueDrawing = (point: Point, pressure: number) => {
    setCurrentDrawing((prev) =>
      prev
        ? {
            color: prev.color,
            drawing: [...prev.drawing, [point.x, point.y, pressure]]
          }
        : { color, drawing: [[point.x, point.y, pressure]] }
    )
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const point = pointerEventToSvgPoint(e)
    if (point) {
      startDrawing(point, e.pressure)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDrawingSession) {
      const point = pointerEventToSvgPoint(e)
      if (point) {
        continueDrawing(point, e.pressure)
      }
    }
  }

  const onPointerUp = () => {
    if (currentDrawing) {
      setSavedDrawings((prev) => [...prev, currentDrawing])
      setCurrentDrawing(null)
    }
    setIsDrawingSession(false)
  }

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.buttons === 1 && isDrawingSession) {
      const point = pointerEventToSvgPoint(e)
      if (point) {
        continueDrawing(point, e.pressure)
      }
    }
  }

  const pointerEventToSvgPoint = (e: React.PointerEvent): Point | null => {
    if (!svgRef.current) return null
    const svgRect = svgRef.current.getBoundingClientRect()
    const x = Math.round((e.clientX - svgRect.left) * (400 / svgRect.width))
    const y = Math.round((e.clientY - svgRect.top) * (400 / svgRect.height))
    if (x >= 0 && x <= svgRect.width && y >= 0 && y <= svgRect.height) {
      return { x, y }
    }
    return null
  }

  const clearDrawings = () => {
    setSavedDrawings([])
    setCurrentDrawing(null)
    setIsDrawingSession(false)
  }

  const className =
    "flex dark:bg-muted border dark:border-secondary-foreground/20 h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground"

  return (
    <div className="relative">
      {!isDrawingSession && (
        <div className="absolute top-0 left-0 z-50">
          <DrawingMenu
            clearDrawings={clearDrawings}
            selectedColor={color}
            setColor={setColor}
          />
        </div>
      )}
      <svg
        className="bg-muted-foreground/25 dark:bg-secondary-foreground/80 rounded-sm size-full aspect-square sm:w-[400px] sm:h-[400px]"
        ref={svgRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerEnter={onPointerEnter}
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`scale(${width / 400}, ${height / 400})`}>
          {savedDrawings.map((drawing, index) => (
            <Path key={index} points={drawing.drawing} fill={drawing.color} />
          ))}
          {currentDrawing && currentDrawing.drawing.length > 0 && (
            <Path points={currentDrawing.drawing} fill={color} />
          )}
        </g>
      </svg>
      <div className="mt-2 space-y-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={className}
          placeholder="Name"
        />
        <div className="relative">
          <input
            maxLength={maxLength}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={className}
            placeholder="Type your message here..."
            aria-label="Input with character limit"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 sm:hidden">
            <AnimatedCircularProgressBar
              className="size-7"
              max={45}
              min={0}
              value={message.length}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
