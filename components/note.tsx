import { Note as NoteType } from "@/liveblocks.config"
import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { getStroke } from "perfect-freehand"
import { PointerEvent } from "react"
import { Path } from "./path"

type NoteProps = {
  index: number
  note: NoteType
  onShapePointerDown: (e: PointerEvent<HTMLDivElement>, index: number) => void
}

const WIDTH = 150
const HEIGHT = 150

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
      className="absolute dark:border-primary/15 border rounded-md bg-background dark:bg-muted before:absolute before:top-0 before:right-0 before:size-full before:bg-transparent"
    >
      <div className="rounded-lg shadow-lg overflow-hidden p-2 max-w-[166px]">
        <svg
          className="bg-muted-foreground/15 dark:bg-secondary-foreground/90 rounded-sm"
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
        <div className="mt-2 space-y-1 break-words">
          <p className="text-xs font-bold font-mono text-muted-foreground truncate">
            {name}
          </p>
          <p className="text-sm font-semibold text-primary">{message}</p>
        </div>
      </div>
    </div>
  )
}
