import React, {
  useState,
  useRef,
  RefObject,
  Dispatch,
  SetStateAction
} from "react"
import { Path } from "./path"
import { DrawingMenu } from "./ui/drawing-menu"
import { CurrentDrawing, Drawings } from "@/types/notes"
import { Point } from "framer-motion"

type Props = {
  name: string
  setName: (name: string) => void
  message: string
  setMessage: (message: string) => void
  savedDrawings: Drawings
  setSavedDrawings: Dispatch<SetStateAction<Drawings>>
  width?: number
  height?: number
}

const DrawingComponent = ({
  name,
  setName,
  message,
  setMessage,
  savedDrawings,
  setSavedDrawings,
  width = 400,
  height = 400
}: Props) => {
  const [currentDrawing, setCurrentDrawing] = useState<CurrentDrawing | null>(
    null
  )
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#000000")

  const svgRef = useRef<SVGSVGElement>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    const point = pointerEventToSvgPoint(e)
    if (point) {
      setIsDrawing(true)
      setCurrentDrawing({
        color,
        drawing: [[point.x, point.y, e.pressure]]
      })
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDrawing) {
      const point = pointerEventToSvgPoint(e)
      if (point) {
        continueDrawing(point, e.pressure)
      } else {
        setIsDrawing(false)
      }
    }
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

  const onPointerUp = () => {
    if (currentDrawing) {
      setSavedDrawings((prev) => [...prev, currentDrawing])
      setCurrentDrawing(null)
      setIsDrawing(false)
    }
  }

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.buttons === 1 && currentDrawing) {
      const point = pointerEventToSvgPoint(e)
      if (point) {
        setIsDrawing(true)
        continueDrawing(point, e.pressure)
      }
    }
  }

  const onPointerLeave = () => {
    setIsDrawing(false)
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
    setIsDrawing(false)
  }

  const className =
    "flex bg-muted border dark:border-secondary-foreground/20 h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground"

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-50">
        <DrawingMenu
          clearDrawings={clearDrawings}
          selectedColor={color}
          setColor={setColor}
        />
      </div>
      <svg
        className="bg-muted dark:bg-secondary-foreground rounded-sm"
        ref={svgRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        width={width}
        height={height}
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
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={className + " min-h-16"}
          placeholder="Message"
        />
      </div>
    </div>
  )
}

export default DrawingComponent
