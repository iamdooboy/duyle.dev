"use client"
import useClickOutside from "@/hooks/use-clickoutside"
import { LiveObject } from "@liveblocks/client"
import { useMutation } from "@liveblocks/react/suspense"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { RefObject, useEffect, useId, useRef, useState } from "react"

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3
}

export function Popover({
  canvasRef
}: { canvasRef: RefObject<HTMLDivElement> }) {
  const uniqueId = useId()
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const openMenu = () => {
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useClickOutside(formContainerRef, () => {
    closeMenu()
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const addNote = useMutation(
    ({ storage, setMyPresence }, { name, message }) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect()
      let x = 0,
        y = 0
      if (canvasRect) {
        x = Math.random() * (canvasRect.width - 100) // Subtracting 100 to ensure the note is fully within the canvas
        y = Math.random() * (canvasRect.height - 100)
      }

      const length = storage.get("notes").length

      const note = new LiveObject({
        id: Date.now().toString(),
        name,
        message,
        x: getRandomInt(300),
        y: getRandomInt(300),
        z: length === 0 ? 1 : length + 1,
        rotate: Math.floor(Math.random() * 141) - 70
      })
      storage.get("notes").push(note)
      setMyPresence({ selection: length + 1 })
    },
    []
  )

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="flex items-center justify-center relative rounded-md">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="flex h-9 items-center border px-3 bg-primary-foreground hover:bg-primary-foreground/60"
          style={{
            borderRadius: 8
          }}
          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className="text-sm rounded-md"
          >
            Leave a note
          </motion.span>
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="absolute top-0 left-0 w-max overflow-hidden border bg-background shadow-md"
              style={{
                borderRadius: 12
              }}
            >
              <form
                className="flex h-full flex-col"
                onSubmit={(e) => {
                  e.preventDefault()
                  addNote({ name, message })
                }}
              >
                <div className="rounded-lg overflow-hidden p-2 w-max flex flex-col gap-2">
                  <div className="aspect-square bg-muted flex justify-center items-center">
                    drawing
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className='class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"'
                    />
                  </div>
                </div>
                <div key="close" className="flex justify-between px-4 py-3">
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={closeMenu}
                    aria-label="Close popover"
                  >
                    x
                  </button>
                  <button
                    className="relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
                    type="submit"
                    aria-label="Submit note"
                    onClick={() => {
                      closeMenu()
                    }}
                  >
                    Submit Note
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
