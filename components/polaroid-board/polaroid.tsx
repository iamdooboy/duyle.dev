"use client"

import { Polaroid as PolaroidType } from "@/liveblocks.config"
import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { motion } from "framer-motion"
import { PointerEvent } from "react"

import { Drawings } from "@/types/polaroids"
import { Path } from "./path"

const WIDTH = 150
const HEIGHT = 150

type PolaroidStyles = Pick<PolaroidType, "x" | "y" | "z" | "rotate">

interface PolaroidProps {
  polaroid: PolaroidStyles
  children: React.ReactNode
}

interface DrawingPolaroid extends PolaroidProps {
  index?: number
  onShapePointerDown?: (e: PointerEvent<HTMLDivElement>, index: number) => void
}

export function DrawingPolaroid({
  index,
  polaroid,
  onShapePointerDown,
  children
}: DrawingPolaroid) {
  const { x, y, z, rotate } = polaroid

  // const selectedByMe = useSelf((me) => me.presence.selection === index)
  // const selectedByOthers = useOthers((others) =>
  //   others.some((other) => other.presence.selection === index)
  // )
  // const selectionColor = selectedByMe
  //   ? "blue"
  //   : selectedByOthers
  //     ? "green"
  //     : "transparent"

  return (
    <motion.div
      initial={{ opacity: 0, y: -y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        rotate: rotate,
        zIndex: z
      }}
    >
      <div
        onPointerDown={(e) =>
          onShapePointerDown && onShapePointerDown(e, index || 0)
        }
        // style={{
        //   transition: !selectedByMe ? "transform 120ms linear" : "none"
        // }}
        className="dark:border-primary/15 border rounded-md bg-background dark:bg-muted before:absolute before:top-0 before:right-0 before:size-full before:bg-transparent"
      >
        <div className="rounded-lg shadow-lg overflow-hidden p-2 max-w-[166px]">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export function Polaroid({ polaroid, children }: PolaroidProps) {
  const { x, y, z, rotate } = polaroid
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        rotate: rotate + "deg",
        zIndex: z
      }}
      className="dark:border-primary/15 border rounded-md bg-background dark:bg-muted before:absolute before:top-0 before:right-0 before:size-full before:bg-transparent"
    >
      <div className="rounded-lg shadow-lg overflow-hidden p-2 max-w-[166px]">
        {children}
      </div>
    </div>
  )
}

type PolaroidPhotoProps = {
  imgSrc?: string
  drawing?: Drawings
}

export const PolaroidPhoto = ({ drawing, imgSrc }: PolaroidPhotoProps) => {
  if (imgSrc) {
    return <img src="/vn.jpg" className="size-[150px] rounded-sm" />
  }
  return (
    <svg
      className="bg-muted-foreground/15 dark:bg-secondary-foreground/90 rounded-sm"
      width={WIDTH}
      height={HEIGHT}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={`scale(${WIDTH / 400}, ${HEIGHT / 400})`}>
        {drawing?.map((stroke, index) => (
          <Path key={index} points={stroke.drawing} fill={stroke.color} />
        ))}
      </g>
    </svg>
  )
}

export const PolaroidInfo = ({
  name,
  message
}: { name: string; message: string }) => {
  return (
    <div className="mt-2 space-y-1 break-words">
      <p className="text-xs font-bold font-mono text-muted-foreground truncate">
        {name}
      </p>
      <p className="text-sm font-semibold text-primary">{message}</p>
    </div>
  )
}
