import React, { useState, useRef } from "react"
import { Path } from "./path"
type Point = {
  x: number
  y: number
}

type DrawingType = [x: number, y: number, pressure: number][]

const DrawingComponent = () => {
  const [currentDrawing, setCurrentDrawing] = useState<DrawingType | null>(null)

  const [savedDrawings, setSavedDrawings] = useState<DrawingType[]>([])

  const svgRef = useRef<SVGSVGElement>(null)

  const startDrawing = (point: Point, pressure: number) => {
    setCurrentDrawing([[point.x, point.y, pressure]])
  }

  const continueDrawing = (point: Point, pressure: number) => {
    setCurrentDrawing((prev) =>
      prev
        ? [...prev, [point.x, point.y, pressure]]
        : [[point.x, point.y, pressure]]
    )
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const point = pointerEventToSvgPoint(e)
    startDrawing(point, e.pressure)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (currentDrawing) {
      const point = pointerEventToSvgPoint(e)
      continueDrawing(point, e.pressure)
    }
  }

  const onPointerUp = () => {
    if (currentDrawing) {
      setSavedDrawings((prev) => [...prev, currentDrawing])
      setCurrentDrawing(null)
    }
  }

  const pointerEventToSvgPoint = (e: React.PointerEvent): Point => {
    if (!svgRef.current) return { x: 0, y: 0 }
    const svgRect = svgRef.current.getBoundingClientRect()
    return {
      x: Math.round(e.clientX - svgRect.left),
      y: Math.round(e.clientY - svgRect.top)
    }
  }

  const clearDrawings = () => {
    setSavedDrawings([])
    setCurrentDrawing(null)
  }

  const className =
    "flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground"

  return (
    <div className="relative">
      <button onClick={clearDrawings} className="absolute top-0 left-1.5 z-50">
        x
      </button>
      <svg
        className="bg-muted dark:bg-secondary-foreground rounded-sm"
        ref={svgRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        width={400}
        height={400}
      >
        {savedDrawings.map((drawing, index) => (
          <Path key={index} points={drawing} fill="#DC2626" x={0} y={0} />
        ))}
        {currentDrawing && currentDrawing.length > 0 && (
          <Path points={currentDrawing} fill="#DC2626" x={0} y={0} />
        )}
      </svg>
      <div className="mt-2 space-y-2">
        <input className={className} placeholder="Name" />
        <textarea className={className + " min-h-16"} placeholder="Message" />
      </div>
    </div>
  )
}

export default DrawingComponent
