import { CurrentDrawing, Drawings } from "@/lib/types"
import { Polaroid } from "@/lib/types"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter
} from "@/ui/alert-dialog"
import { AnimatedCircularProgressBar } from "@/ui/circular-progress"
import { LiveObject } from "@liveblocks/client"
import { useMutation } from "@liveblocks/react/suspense"
import { Point } from "framer-motion"
import { RefObject, useRef, useState } from "react"
import { DrawingMenu } from "./drawing-menu"
import { Path } from "./path"

type Props = {
  setHasPosted: (value: boolean) => void
  canvasRef: RefObject<HTMLDivElement>
  width?: number
  height?: number
}

export const Canvas = ({
  setHasPosted,
  canvasRef,
  width = 400,
  height = 400
}: Props) => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [savedDrawings, setSavedDrawings] = useState<Drawings>([])

  const [currentDrawing, setCurrentDrawing] = useState<CurrentDrawing | null>(
    null
  )
  const [isDrawingSession, setIsDrawingSession] = useState(false)
  const [color, setColor] = useState("#000000")

  const maxLength = 45
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

  const addNote = useMutation(
    (
      { storage, setMyPresence },
      { name, message, drawing }: Pick<Polaroid, "name" | "message" | "drawing">
    ) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      let x = 0,
        y = 0
      if (canvasRect) {
        x = Math.random() * (canvasRect.width - 100)
        y = Math.random() * (canvasRect.height - 100)
      }

      const length = storage.get("polaroids").length
      const note = new LiveObject({
        id: Date.now().toString(),
        name,
        message,
        drawing,
        x: getRandomInt(300),
        y: getRandomInt(300),
        z: 1,
        rotate: Math.floor(Math.random() * 141) - 70
      })
      storage.get("polaroids").push(note)
      setMyPresence({ selection: length + 1 })

      setHasPosted(true)
      localStorage.setItem("duyle.dev_has_posted", "true")
    },
    []
  )

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
        className="bg-muted-foreground/25 dark:bg-secondary-foreground/80 rounded-sm"
        ref={svgRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerEnter={onPointerEnter}
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
        <input
          maxLength={maxLength}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={className}
          placeholder="Type your message here..."
          aria-label="Input with character limit"
        />

        <AlertDialogFooter>
          <AnimatedCircularProgressBar
            className="size-8"
            max={45}
            min={0}
            value={message.length}
          />
          <div className="space-x-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => addNote({ name, message, drawing: savedDrawings })}
            >
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </div>
    </div>
  )
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
