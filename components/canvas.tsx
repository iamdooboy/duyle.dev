"use client"

import { useMutation, useOthers, useStorage } from "@liveblocks/react/suspense"
import { PointerEvent, useEffect, useRef, useState } from "react"
import { GridPattern } from "./grid-pattern"
import { Note } from "./note"
import DrawingComponent from "./signature"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog"
import { Icons } from "./ui/icons"
import { RainbowButton } from "./ui/rainbow-button"

export const Canvas = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [hasPosted, setHasPosted] = useState(false)

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
      notes.forEach((note, i) => {
        if (i !== index) {
          if (i === index) {
            note.set("z", 10)
          } else {
            note.set("z", 1)
          }
        }
      })
      if (notes.length !== index) {
        notes.get(index)?.set("z", 10)
      }
      setMyPresence({ selection: index })
      setIsDragging(true)
      dragStartPositionRef.current = { x: e.clientX, y: e.clientY }
    },
    []
  )

  const onCanvasPointerUp = useMutation(
    ({ self, storage, setMyPresence }) => {
      if (!isDragging) {
        setMyPresence({ selection: null })
      }

      const index = self.presence.selection
      if (index === null) {
        return
      }
      storage.get("notes").get(index)?.set("z", 1)
      storage.get("notes").move(index, notes.length - 1)
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

  return (
    <AlertDialog>
      <div className="relative">
        <div className="absolute border top-0 left-0 w-full z-50 bg-muted/80 rounded-t-md p-2 flex items-center justify-between">
          <div className="flex items-center justify-center gap-1.5">
            <p className="font-mono">{numOthers + 1}</p>
            <Icons.users className="size-5" />
          </div>
          <AlertDialogTrigger>
            <RainbowButton>Leave a note</RainbowButton>
          </AlertDialogTrigger>
          {/* {hasPosted ? (
              <div className="font-mono">Thanks for posting!</div>
            ) : (
              <AlertDialogTrigger>add a note</AlertDialogTrigger>
            )} */}
        </div>
        <div
          className="rounded-lg h-screen border relative overflow-hidden bg-background"
          ref={canvasRef}
          onPointerMove={onCanvasPointerMove}
          onPointerUp={onCanvasPointerUp}
        >
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className="opacity-30"
          />
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
      </div>
      <AlertDialogContent className="rounded-md bg-background dark:bg-muted w-max p-2">
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle>Leave me a note</AlertDialogTitle>
          <AlertDialogDescription>
            Write a note about anything!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <DrawingComponent setHasPosted={setHasPosted} canvasRef={canvasRef} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
