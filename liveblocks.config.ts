import { LiveList, LiveObject } from "@liveblocks/client"

export type Note = {
  id: string
  name: string
  message: string
  x: number
  y: number
  z: number
  rotate: number
}

export type Cursor = {
  x: number
  y: number
}

declare global {
  interface Liveblocks {
    Presence: {
      selection: number | null
      cursor: Cursor | null
    }
    Storage: {
      notes: LiveList<LiveObject<Note>>
    }
  }
}
