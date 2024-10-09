import { liveblocks } from "@/liveblocks.server.config"

export async function POST() {
  const session = liveblocks.prepareSession(
    `user-1`
    // `user-${Math.floor(Math.random() * 10)}`
  )
  session.allow(`visitors-room*`, session.FULL_ACCESS)

  // Authorize the user and return the result
  const { status, body } = await session.authorize()
  return new Response(body, { status })
}
