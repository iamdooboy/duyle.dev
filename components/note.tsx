import { useOthers, useSelf, useStorage } from "@liveblocks/react/suspense"
import { PointerEvent } from "react"

type NoteProps = {
  id: string
  onShapePointerDown: (e: PointerEvent<HTMLDivElement>, id: string) => void
}

export function Note({ id, onShapePointerDown }: NoteProps) {
  const { name, message, x, y, fill } =
    useStorage((root) => root.notes.get(id)) ?? {}

  const selectedByMe = useSelf((me) => me.presence.selection === id)
  const selectedByOthers = useOthers((others) =>
    others.some((other) => other.presence.selection === id)
  )
  const selectionColor = selectedByMe
    ? "blue"
    : selectedByOthers
      ? "green"
      : "transparent"

  return (
    <div
      onPointerDown={(e) => onShapePointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: !selectedByMe ? "transform 120ms linear" : "none",
        // backgroundColor: fill || "#CCC",
        // borderColor: selectionColor
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
