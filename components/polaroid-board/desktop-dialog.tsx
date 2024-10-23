import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/ui/alert-dialog"
import { AnimatedCircularProgressBar } from "@/ui/circular-progress"
import { RainbowButton } from "@/ui/rainbow-button"

type Props = {
  addNote: () => void
  message: string
  children: React.ReactNode
}

export const DesktopDialog = ({ addNote, message, children }: Props) => {
  return (
    <div className="hidden sm:block">
      <AlertDialog>
        <AlertDialogTrigger asChild className="sm:block hidden">
          <RainbowButton>Leave a note</RainbowButton>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-md bg-background dark:bg-muted w-max p-2 gap-2">
          <AlertDialogHeader className="sr-only">
            <AlertDialogTitle>Leave me a note</AlertDialogTitle>
            <AlertDialogDescription>
              Write a note about anything!
            </AlertDialogDescription>
          </AlertDialogHeader>
          {children}
          <AlertDialogFooter className="sm:flex hidden">
            <AnimatedCircularProgressBar
              className="size-8"
              max={45}
              min={0}
              value={message.length}
            />
            <div className="space-x-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={addNote}>Submit</AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
