import { cn } from "@/lib/utils"
interface BlobProps extends React.HTMLAttributes<HTMLDivElement> {
  firstBlobColor: string
  secondBlobColor: string
}

export default function BlurryBlob({
  className,
  firstBlobColor,
  secondBlobColor
}: BlobProps) {
  return (
    <div className="min-h-52 min-w-52 items-center justify-center absolute top-0 left-0">
      <div className="relative w-full max-w-lg">
        <div
          className={cn(
            "absolute -right-24 -top-28 h-72 w-72 animate-pop-blob rounded-sm bg-blue-400 p-8 opacity-45 mix-blend-multiply dark:mix-blend-plus-lighter blur-3xl filter z-0",
            className,
            firstBlobColor
          )}
        ></div>
        <div
          className={cn(
            "absolute -left-40 -top-64 h-72 w-72 animate-pop-blob rounded-sm bg-purple-400 p-8 opacity-45 mix-blend-multiply dark:mix-blend-plus-lighter blur-3xl filter z-0",
            className,
            secondBlobColor
          )}
        ></div>
      </div>
    </div>
  )
}
