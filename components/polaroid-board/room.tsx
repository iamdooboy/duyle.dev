"use client"

import { LiveList } from "@liveblocks/client"
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider
} from "@liveblocks/react/suspense"
import { ReactNode } from "react"
import { PhotoBoard } from "./photo-board"

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        initialPresence={{
          selection: null,
          cursor: null
        }}
        id="visitors-room"
        initialStorage={{ polaroids: new LiveList([]) }}
      >
        <ClientSideSuspense
          fallback={<PhotoBoard numOthers={0} children={undefined} />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
