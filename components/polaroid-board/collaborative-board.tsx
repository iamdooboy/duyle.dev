"use client"

import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence
} from "@liveblocks/react/suspense"
import { PointerEvent, TouchEvent, useEffect, useRef, useState } from "react"
import { PhotoBoard } from "./photo-board"
import { DrawingPolaroid, PolaroidInfo, PolaroidPhoto } from "./polaroid"

export const CollaborativeBoard = () => {
  const updateMyPresence = useUpdateMyPresence()

  const [isDragging, setIsDragging] = useState(false)

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

  const polaroids = useStorage((root) => root.polaroids)
  const numOthers = useOthers((others) => others.length)

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

      const notes = storage.get("polaroids")
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

  const deletePolaroid = useMutation(({ storage }, index: number) => {
    console.log("delete", index)
    storage.get("polaroids").delete(index)
  }, [])

  const onCanvasPointerUp = useMutation(
    ({ self, storage, setMyPresence }) => {
      setMyPresence({ selection: null })
      const length = storage.get("polaroids").length
      const index = self.presence.selection
      if (index !== null) {
        storage.get("polaroids").get(index)?.set("z", 1)
        storage.get("polaroids").move(index, length - 1)
      }
      setIsDragging(false)
    },
    [isDragging]
  )

  const onCanvasPointerMove = useMutation(
    (
      { self, storage, setMyPresence },
      e: PointerEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
    ) => {
      e.preventDefault() // Prevent scrolling
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (canvasRect === undefined) return

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      setMyPresence({
        cursor: {
          x: Math.round(clientX - canvasRect.left),
          y: Math.round(clientY - canvasRect.top)
        }
      })

      if (!isDragging) return

      const index = self.presence.selection
      if (index === null) return

      const note = storage.get("polaroids").get(index)

      if (note && canvasRect) {
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

  const onCanvasPointerLeave = () => {
    updateMyPresence({ cursor: null })
  }

  return (
    <>
      <PhotoBoard
        numOthers={numOthers}
        canvasRef={canvasRef}
        onCanvasPointerMove={onCanvasPointerMove}
        onCanvasPointerUp={onCanvasPointerUp}
        onCanvasPointerLeave={onCanvasPointerLeave}
      >
        {polaroids.map((polaroid, index) => {
          return (
            <DrawingPolaroid
              key={polaroid.id}
              index={index}
              polaroid={polaroid}
              onShapePointerDown={onShapePointerDown}
            >
              <PolaroidPhoto drawing={polaroid.drawing} />
              <PolaroidInfo name={polaroid.name} message={polaroid.message} />
            </DrawingPolaroid>
          )
        })}
      </PhotoBoard>
    </>
  )
}
