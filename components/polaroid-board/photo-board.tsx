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
  return (
    <div className="relative">
      <div className="absolute border top-0 left-0 w-full z-50 bg-muted/80 rounded-t-md p-2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-1.5">
          <p className="font-mono">{numOthers + 1}</p>
          <Icons.users className="size-5" />
        </div>
        {!children ? (
          <RainbowButton>Leave a note</RainbowButton>
        ) : (
          <AlertDialogTrigger asChild>
            <RainbowButton>Leave a note</RainbowButton>
          </AlertDialogTrigger>
        )}
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
        onPointerLeave={onCanvasPointerLeave}
        onTouchMove={onCanvasPointerMove}
      >
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className="opacity-35"
        />
        <Polaroid polaroid={{ x: 334, y: 480, z: 0, rotate: 30 }}>
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
