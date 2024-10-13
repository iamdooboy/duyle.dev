import { Note as NoteType } from "@/liveblocks.config"
import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { PointerEvent } from "react"
import { getStroke } from "perfect-freehand"
import { Path } from "./path"

type NoteProps = {
  index: number
  note: NoteType
  onShapePointerDown: (e: PointerEvent<HTMLDivElement>, index: number) => void
}

const WIDTH = 200
const HEIGHT = 200

export function Note({ index, note, onShapePointerDown }: NoteProps) {
  const { name, message, drawing, x, y, z, rotate } = note

  const selectedByMe = useSelf((me) => me.presence.selection === index)
  const selectedByOthers = useOthers((others) =>
    others.some((other) => other.presence.selection === index)
  )
  const selectionColor = selectedByMe
    ? "blue"
    : selectedByOthers
      ? "green"
      : "transparent"

  return (
    <div
      onPointerDown={(e) => onShapePointerDown(e, index)}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        transition: !selectedByMe ? "transform 120ms linear" : "none",
        zIndex: z
      }}
      className="z-10 absolute border rounded-md bg-background dark:bg-muted w-max before:absolute before:top-0 before:right-0 before:size-full before:bg-transparent"
    >
      <div className="rounded-lg shadow-lg overflow-hidden p-2">
        <svg
          className="bg-muted dark:bg-secondary-foreground rounded-sm"
          width={WIDTH}
          height={HEIGHT}
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform={`scale(${WIDTH / 400}, ${HEIGHT / 400})`}>
            {drawing.map((stroke, index) => (
              <Path key={index} points={stroke.drawing} fill={stroke.color} />
            ))}
          </g>
        </svg>
        {/* <img
          src="/placeholder.svg"
          alt="Polaroid Photo"
          className="object-cover size-40 rounded-sm"
        /> */}
        <div className="mt-2 space-y-1">
          <p className="text-xs text-muted-foreground">{name}</p>
          <p className="text-sm text-primary">{message}</p>
        </div>
      </div>
    </div>
  )
}
