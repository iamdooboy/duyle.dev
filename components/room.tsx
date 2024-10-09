"use client"

import { Note } from "@/liveblocks.config"
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client"
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider
} from "@liveblocks/react/suspense"
import { ReactNode } from "react"

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        initialPresence={{
          selection: null,
          cursor: null
        }}
        id="visitors-room"
        initialStorage={{ notes: new LiveMap() }}
      >
        <ClientSideSuspense fallback={"Loading..."}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
