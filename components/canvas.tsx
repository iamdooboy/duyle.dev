"use client"

import { useMutation, useOthers, useStorage } from "@liveblocks/react/suspense"
import { AnimatePresence, motion } from "framer-motion"
import { PointerEvent, TouchEvent, useEffect, useRef, useState } from "react"
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
      e: PointerEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
      index: number
    ) => {
      e.stopPropagation()
      if (e.type === "touchstart") {
        e.preventDefault() // Prevent scrolling on touch devices
      }

      const notes = storage.get("notes")
      notes.forEach((note, i) => {
        note.set("z", i === index ? 10 : 1)
      })
      setMyPresence({ selection: index })
      setIsDragging(true)

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      dragStartPositionRef.current = { x: clientX, y: clientY }
    },
    []
  )

  const onCanvasPointerUp = useMutation(
    ({ self, storage, setMyPresence }) => {
      if (!isDragging) {
        setMyPresence({ selection: null })
      }

      const index = self.presence.selection
      if (index !== null) {
        storage.get("notes").get(index)?.set("z", 1)
        storage.get("notes").move(index, notes.length - 1)
      }
      setIsDragging(false)
    },
    [isDragging]
  )

  const onCanvasPointerMove = useMutation(
    (
      { self, storage },
      e: PointerEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
    ) => {
      e.preventDefault() // Prevent scrolling
      if (!isDragging) return

      const index = self.presence.selection
      if (index === null) return

      const note = storage.get("notes").get(index)
      const canvasRect = canvasRef.current?.getBoundingClientRect()

      if (note && canvasRect) {
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

        if (
          clientX < canvasRect.left ||
          clientX > canvasRect.right ||
          clientY < canvasRect.top ||
          clientY > canvasRect.bottom
        ) {
          return // If outside, stop dragging
        }

        const dx = clientX - dragStartPositionRef.current.x
        const dy = clientY - dragStartPositionRef.current.y
        note.update({
          x: note.get("x") + dx,
          y: note.get("y") + dy
        })
        dragStartPositionRef.current = { x: clientX, y: clientY }
      }
    },
    [isDragging]
  )

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault()
      }
    }

    document.addEventListener("touchmove", handleTouchMove as any, {
      passive: false
    })
    return () => {
      document.removeEventListener("touchmove", handleTouchMove as any)
    }
  }, [isDragging])

  return (
    <AlertDialog>
      <div className="relative">
        <div className="absolute border top-0 left-0 w-full z-50 bg-muted/80 rounded-t-md p-2 flex items-center justify-between">
          <div className="flex items-center justify-center gap-1.5">
            <p className="font-mono">{numOthers + 1}</p>
            <Icons.users className="size-5" />
          </div>
          <AlertDialogTrigger asChild>
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
          onTouchMove={onCanvasPointerMove}
        >
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className="opacity-30"
          />
          <AnimatePresence>
            {notes.map((note, index) => {
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: -note.y }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "absolute",
                    left: note.x,
                    top: note.y,
                    rotate: note.rotate,
                    zIndex: note.z
                  }}
                >
                  <Note
                    index={index}
                    note={note}
                    onShapePointerDown={onShapePointerDown}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
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
