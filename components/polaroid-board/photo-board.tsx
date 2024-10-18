"use client"

import { GridPattern } from "@/background/grid-pattern"
import { Icons } from "@/ui/icons"
import { RainbowButton } from "@/ui/rainbow-button"
import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { AnimatePresence } from "framer-motion"
import { PointerEvent, TouchEvent } from "react"
import { LiveCursor } from "./cursor/live-cursor"
import { PolaroidInfo, PolaroidPhoto } from "./polaroid"
import { Polaroid } from "./polaroid"

type PhotoBoardProps = {
  hasPosted?: boolean
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
  hasPosted,
  numOthers,
  canvasRef,
  onCanvasPointerMove,
  onCanvasPointerUp,
  onCanvasPointerLeave,
  children
}: PhotoBoardProps) => {
  return (
    <div className="relative bg-muted rounded-lg">
      <div className="absolute top-0 border left-0 w-full z-50 bg-muted/90 rounded-t-lg p-2 flex items-center justify-between min-h-[60px]">
        <div className="flex items-center justify-center gap-1.5">
          <p className="font-mono">{numOthers + 1}</p>
          <Icons.users className="size-5" />
        </div>
        {!children ? (
          <RainbowButton className="opacity-70">Leave a note</RainbowButton>
        ) : hasPosted ? (
          <div className="font-mono">Thanks for posting!</div>
        ) : (
          <AlertDialogTrigger asChild>
            <RainbowButton>Leave a note</RainbowButton>
          </AlertDialogTrigger>
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
