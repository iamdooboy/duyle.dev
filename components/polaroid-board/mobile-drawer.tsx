import { Button } from "@/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/ui/drawer"
import { RainbowButton } from "@/ui/rainbow-button"
import { useState } from "react"

type Props = {
  addNote: () => void
  children: React.ReactNode
}

export const MobileDrawer = ({ addNote, children }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="sm:hidden">
      <Drawer
        open={open}
        onOpenChange={setOpen}
        dismissible={false}
        repositionInputs={false}
      >
        <DrawerTrigger asChild>
          <RainbowButton>Leave a note</RainbowButton>
        </DrawerTrigger>
        <DrawerContent className="px-2">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter>
            <Button className="w-full" onClick={addNote}>
              Submit
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
