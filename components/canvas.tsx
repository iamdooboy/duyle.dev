"use client"
import { cn } from "@/lib/utils"
import { useMutation, useOthers, useStorage } from "@liveblocks/react/suspense"
import { PointerEvent, useEffect, useRef, useState } from "react"
import { GridPattern } from "./grid-pattern"
import { Note } from "./note"
import DrawingComponent from "./signature"
import { Icons } from "./ui/icons"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog"
import { LiveObject } from "@liveblocks/client"
import { Drawings } from "@/types/notes"
import { Note as NoteProp } from "@/liveblocks.config"

export const Canvas = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [hasPosted, setHasPosted] = useState(false)
  const [savedDrawings, setSavedDrawings] = useState<Drawings>([])

  useEffect(() => {
    const posted = localStorage.getItem("duyle.dev_has_posted")
    if (posted === "true") {
      setHasPosted(true)
    }
  }, [])

  const numOthers = useOthers((others) => others.length)
  const notes = useStorage((root) => root.notes)

  const canvasRef = useRef<HTMLDivElement>(null)
  const dragStartPositionRef = useRef({ x: 0, y: 0 })

  const onShapePointerDown = useMutation(
    (
      { storage, setMyPresence },
      e: PointerEvent<HTMLDivElement>,
      index: number
    ) => {
      e.stopPropagation()

      const notes = storage.get("notes")
      const highestZIndex = notes.get(notes.length - 1)?.get("z") ?? 1

      if (notes.length !== index) {
        notes.get(index)?.set("z", highestZIndex + 1)
      }
      setMyPresence({ selection: index })
      setIsDragging(true)
      dragStartPositionRef.current = { x: e.clientX, y: e.clientY }
    },
    []
  )

  const onCanvasPointerUp = useMutation(
    ({ setMyPresence }) => {
      if (!isDragging) {
        setMyPresence({ selection: null })
      }
      setIsDragging(false)
    },
    [isDragging]
  )

  const onCanvasPointerMove = useMutation(
    ({ self, storage }, e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!isDragging) {
        return
      }
      const index = self.presence.selection
      if (index === null) {
        return
      }
      const note = storage.get("notes").get(index)

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
        const dx = e.clientX - dragStartPositionRef.current.x
        const dy = e.clientY - dragStartPositionRef.current.y
        note.update({
          x: note.get("x") + dx,
          y: note.get("y") + dy
        })
        dragStartPositionRef.current = { x: e.clientX, y: e.clientY }
      }
    },
    [isDragging]
  )

  const addNote = useMutation(
    (
      { storage, setMyPresence },
      { name, message, drawing }: Pick<NoteProp, "name" | "message" | "drawing">
    ) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      let x = 0,
        y = 0
      if (canvasRect) {
        x = Math.random() * (canvasRect.width - 100) // Subtracting 100 to ensure the note is fully within the canvas
        y = Math.random() * (canvasRect.height - 100)
      }

      const length = storage.get("notes").length

      const note = new LiveObject({
        id: Date.now().toString(),
        name,
        message,
        drawing,
        x: getRandomInt(300),
        y: getRandomInt(300),
        z: length === 0 ? 1 : length + 1,
        rotate: Math.floor(Math.random() * 141) - 70
      })
      storage.get("notes").push(note)
      setMyPresence({ selection: length + 1 })

      setHasPosted(true)
      localStorage.setItem("duyle.dev_has_posted", "true")
    },
    []
  )

  return (
    <AlertDialog>
      <div className="relative">
        <div className="absolute border top-0 left-0 w-full z-50 bg-muted/80 rounded-t-md p-2 flex items-center justify-between">
          <div className="flex items-center justify-center gap-1.5">
            <p className="font-mono">{numOthers + 1}</p>
            <Icons.users className="size-5" />
          </div>
          <AlertDialogTrigger>add a note</AlertDialogTrigger>
          {/* {hasPosted ? (
            <div className="font-mono">Thanks for posting!</div>
          ) : (
            <AlertDialogTrigger>add a note</AlertDialogTrigger>
          )} */}
        </div>
        <div
          className="rounded-lg h-screen border bg-background relative overflow-hidden"
          ref={canvasRef}
          onPointerMove={onCanvasPointerMove}
          onPointerUp={onCanvasPointerUp}
        >
          {notes.map((note, index) => {
            return (
              <Note
                key={note.id}
                index={index}
                note={note}
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
          className={cn("opacity-30")}
        />
      </div>
      <AlertDialogContent className="rounded-md bg-background dark:bg-muted w-max p-2">
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>Leave me a note</AlertDialogTitle>
          <AlertDialogDescription>
            Write a note about anything!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <DrawingComponent
          name={name}
          setName={setName}
          message={message}
          setMessage={setMessage}
          savedDrawings={savedDrawings}
          setSavedDrawings={setSavedDrawings}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => addNote({ name, message, drawing: savedDrawings })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
