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
        backgroundColor: fill || "#CCC",
        borderColor: selectionColor
      }}
      className="size-32 absolute"
    >
      <p className="text-black">{name}</p>
      <div className="text-black">{message}</div>
    </div>
  )
}
