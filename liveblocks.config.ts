import { LiveList, LiveObject } from "@liveblocks/client"
import { Drawings } from "./types/polaroids"

export type Polaroid = {
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
      polaroids: LiveList<LiveObject<Polaroid>>
    }
  }
}
