"use client"

import { LiveObject, shallow } from "@liveblocks/client"
import {
  useHistory,
  useMutation,
  useOthers,
  useStorage
} from "@liveblocks/react/suspense"
import { useRef, useState, PointerEvent } from "react"
import { Note } from "./note"
import { GridPattern } from "./grid-pattern"
import { cn } from "@/lib/utils"
import { Popover } from "./pop-over"
import { Icons } from "./ui/icons"

export const Canvas = () => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const history = useHistory()
  const numOthers = useOthers((others) => others.length)

  const noteIds = useStorage((root) => Array.from(root.notes.keys()), shallow)

  const addNote = useMutation(
    ({ storage, setMyPresence }, { name, message }) => {
      const noteId = Date.now().toString()
      const canvasRect = canvasRef.current?.getBoundingClientRect()

      let x = 0,
        y = 0
      if (canvasRect) {
        x = Math.random() * (canvasRect.width - 100) // Subtracting 100 to ensure the note is fully within the canvas
        y = Math.random() * (canvasRect.height - 100)
      }
      const note = new LiveObject({
        name,
        message,
        x: getRandomInt(300),
        y: getRandomInt(300),
        fill: getRandomColor()
      })
      storage.get("notes").set(noteId, note)
      setMyPresence({ selection: noteId })
    },
    []
  )

  const onShapePointerDown = useMutation(
    ({ setMyPresence }, e: PointerEvent<HTMLDivElement>, noteId: string) => {
      history.pause()
      e.stopPropagation()

      setMyPresence({ selection: noteId }, { addToHistory: true })
      setIsDragging(true)
    },
    [history]
  )

  const onCanvasPointerUp = useMutation(
    ({ setMyPresence }) => {
      if (!isDragging) {
        setMyPresence({ selection: null }, { addToHistory: true })
      }

      setIsDragging(false)
      history.resume()
    },
    [isDragging, history]
  )

  const onCanvasPointerMove = useMutation(
    ({ storage, self }, e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      console.log({ x: e.clientX, y: e.clientY })
      if (!isDragging) {
        return
      }

      const noteId = self.presence.selection
      if (!noteId) {
        return
      }
      const note = storage.get("notes").get(noteId)
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (note && canvasRect) {
        if (
          e.clientX < canvasRect.left ||
          e.clientX > canvasRect.right ||
          e.clientY < canvasRect.top ||
          e.clientY > canvasRect.bottom
        ) {
          // If outside, stop dragging
          return
        }
        const newX = e.clientX - canvasRect.left - 64
        const newY = e.clientY - canvasRect.top - 64
        note.update({
          x: newX,
          y: newY
        })
      }
    },
    [isDragging]
  )

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full z-50 bg-muted/80 rounded-t-md p-2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-1.5">
          <p className="font-mono">{numOthers + 1}</p>
          <Icons.users className="size-5" />
        </div>
        <Popover />
      </div>
      <div
        className="rounded-lg h-screen border bg-background relative overflow-hidden"
        ref={canvasRef}
        onPointerMove={onCanvasPointerMove}
        onPointerUp={onCanvasPointerUp}
      >
        {noteIds.map((noteId: string) => {
          return (
            <Note
              key={noteId}
              id={noteId}
              onShapePointerDown={onShapePointerDown}
            />
          )
        })}
      </div>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] opacity-35"
        )}
      />
    </div>
  )
}

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"]

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

function getRandomColor(): string {
  return COLORS[getRandomInt(COLORS.length)]
}
