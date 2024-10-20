"use client"

import { GridPattern } from "@/background/grid-pattern"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Drawings } from "@/lib/types"
import { RainbowButton } from "@/ui/rainbow-button"
import { LiveObject } from "@liveblocks/client"
import { ClientSideSuspense, useMutation } from "@liveblocks/react/suspense"
import { AnimatePresence } from "framer-motion"
import { PointerEvent, TouchEvent, useEffect, useState } from "react"
import { Canvas } from "./canvas"
import { LiveCursor } from "./cursor/live-cursor"
import { DesktopDialog } from "./desktop-dialog"
import MobileDrawer from "./mobile-drawer"
import { PolaroidInfo, PolaroidPhoto } from "./polaroid"
import { Polaroid } from "./polaroid"

type PhotoBoardProps = {
  numOthers: number
  canvasRef?: React.RefObject<HTMLDivElement>
  onCanvasPointerMove?: (
    e: PointerEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => void
  onCanvasPointerUp?: () => void
  onCanvasPointerLeave?: () => void
  children: React.ReactNode
}

export const PhotoBoard = ({
  numOthers,
  canvasRef,
  onCanvasPointerMove,
  onCanvasPointerUp,
  onCanvasPointerLeave,
  children
}: PhotoBoardProps) => {
  const [hasPosted, setHasPosted] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [drawing, setDrawing] = useState<Drawings>([])

  useEffect(() => {
    const posted = localStorage.getItem("duyle.dev_has_posted")
    if (posted === "true") {
      setHasPosted(true)
    }
  }, [])

  const addNote = useMutation(
    ({ storage, setMyPresence }, { name, message, drawing }) => {
      const canvasRect = canvasRef?.current?.getBoundingClientRect()
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

  return (
    <div className="relative bg-muted rounded-lg">
      <div className="absolute top-0 border left-0 w-full bg-muted/90 rounded-t-lg p-2 flex items-center justify-between min-h-[60px] z-20">
        <div className="flex items-center justify-center gap-2.5">
          <p className="font-mono">{numOthers + 1}</p>
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-muted-foreground/50 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-muted-foreground/50"></span>
          </span>
        </div>
        {!children || !canvasRef ? (
          <RainbowButton className="opacity-70">Leave a note</RainbowButton>
        ) : isDesktop ? (
          // <div className="font-mono">Thanks for posting!</div>
          <DesktopDialog
            message={message}
            addNote={() => addNote({ name, message, drawing })}
          >
            <Canvas
              name={name}
              setName={setName}
              message={message}
              setMessage={setMessage}
              savedDrawings={drawing}
              setSavedDrawings={setDrawing}
            />
          </DesktopDialog>
        ) : (
          <MobileDrawer addNote={() => addNote({ name, message, drawing })}>
            <Canvas
              name={name}
              setName={setName}
              message={message}
              setMessage={setMessage}
              savedDrawings={drawing}
              setSavedDrawings={setDrawing}
            />
          </MobileDrawer>
        )}
      </div>
      <div
        className="rounded-lg h-screen border relative overflow-hidden bg-background shadow-sm"
        ref={canvasRef}
        onPointerMove={onCanvasPointerMove}
        onPointerUp={onCanvasPointerUp}
        onPointerLeave={onCanvasPointerLeave}
        onTouchMove={onCanvasPointerMove}
      >
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className="opacity-70"
        />
        <Polaroid
          canvasRef={canvasRef}
          polaroid={{ x: 190, y: 638, z: 0, rotate: 10 }}
        >
          <PolaroidPhoto imgSrc="/vn.jpg" />
          <PolaroidInfo
            name="07/05/2024"
            message="Night streets of Ho Chi Minh City, Vietnam"
          />
        </Polaroid>
        <AnimatePresence>{children}</AnimatePresence>
        <ClientSideSuspense fallback={null}>
          <LiveCursor />
        </ClientSideSuspense>
      </div>
    </div>
  )
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
