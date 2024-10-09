import { LiveMap, LiveObject, LiveList } from "@liveblocks/client"

export type Note = LiveObject<{
  name: string
  message: string
  x: number;
  y: number;
  fill: string;
}>

export type Cursor = {
  x: number
  y: number
}

declare global {
  interface Liveblocks {
    Presence: {
      selection: string | null
      cursor: Cursor | null
    }
    Storage: {
      notes: LiveMap<string, Note>
    }
  }
}

export {}
