"use client"

import { COLORS } from "@/lib/constants"
import { useOthersMapped } from "@liveblocks/react/suspense"
import { Cursor } from "./cursor"

export function LiveCursor() {
  const cursors = useOthersMapped((other) => other.presence.cursor)
  return (
    <>
      {cursors.map(([connectionId, cursor]) => {
        if (cursor === null) return null
        return (
          <Cursor
            key={connectionId}
            x={cursor.x}
            y={cursor.y}
            color={COLORS[connectionId % COLORS.length]}
          />
        )
      })}
    </>
  )
}
