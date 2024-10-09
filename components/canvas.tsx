"use client"

import { LiveObject, shallow } from "@liveblocks/client"
import { useHistory, useMutation, useStorage } from "@liveblocks/react/suspense"
import { useRef, useState, PointerEvent } from "react"
import { Note } from "./note"

export const Canvas = () => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const history = useHistory()

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
      <div
        ref={canvasRef}
        className="w-full h-full min-h-screen bg-slate-700 relative overflow-hidden"
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
      <div className="absolute top-4 left-4">
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => addNote({ name, message })}>submit</button>
      </div>
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
