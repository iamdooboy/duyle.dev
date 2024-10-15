"use client"

import { cn } from "@/lib/utils"
import { LiveList } from "@liveblocks/client"
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider
} from "@liveblocks/react/suspense"
import { ReactNode } from "react"
import { GridPattern } from "./grid-pattern"
import { Icons } from "./ui/icons"
import { RainbowButton } from "./ui/rainbow-button"

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        initialPresence={{
          selection: null,
          cursor: null
        }}
        id="visitors-room"
        initialStorage={{ notes: new LiveList([]) }}
      >
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}

const Loading = () => {
  return (
    <div className="relative">
      <div className="absolute border top-0 left-0 w-full z-50 bg-muted/80 rounded-t-md p-2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-1.5">
          <p className="font-mono">1</p>
          <Icons.users className="size-5" />
        </div>

        <div className="bg-muted opacity-40 size-fit rounded-md">
          <RainbowButton className="cursor-wait">Leave a note</RainbowButton>
        </div>
      </div>
      <div className="rounded-lg h-screen border bg-background relative overflow-hidden">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn("opacity-30")}
        />
      </div>
    </div>
  )
}
