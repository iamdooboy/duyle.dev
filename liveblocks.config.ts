import { LiveList, LiveObject } from "@liveblocks/client"
import { Drawings } from "./types/notes"

export type Note = {
  id: string
  name: string
  message: string
  drawing: Drawings
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
