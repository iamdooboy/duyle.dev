import { LiveList, LiveObject } from "@liveblocks/client"
import { Cursor, Polaroid } from "./lib/types"

declare global {
  interface Liveblocks {
    Presence: {
      selection: number | null
      cursor: Cursor | null
    }
    Storage: {
      polaroids: LiveList<LiveObject<Polaroid>>
    }
  }
}
