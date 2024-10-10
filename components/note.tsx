import { Note as NoteType } from "@/liveblocks.config"
import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { PointerEvent } from "react"

type NoteProps = {
  index: number
  note: NoteType
  onShapePointerDown: (e: PointerEvent<HTMLDivElement>, index: number) => void
}

export function Note({ index, note, onShapePointerDown }: NoteProps) {
  const { name, message, x, y, z, rotate } = note

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
        <img
          src="/placeholder.svg"
          alt="Polaroid Photo"
          className="object-cover size-40 rounded-sm"
        />
        <div className="mt-2 space-y-1">
          <p className="text-xs text-muted-foreground">{name}</p>
          <p className="text-sm text-primary">{message}</p>
        </div>
      </div>
    </div>
  )
}
