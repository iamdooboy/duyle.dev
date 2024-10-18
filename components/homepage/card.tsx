import { cn } from "@/lib/utils"

export const Card = ({
  name,
  body,
  link,
  image
}: {
  name: string
  body: string
  link: string
  image: string
}) => {
  return (
    <div
      className={cn(
        "bg-background col-span-2 sm:col-span-1 h-32 w-full cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-300 shadow-sm hover:bg-primary/[0.03] hover:dark:bg-neutral-800/30",
        // light styles
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_40px_-20px_#ffffff1f_inset]"
      )}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-start gap-2">
              <img
                src={image}
                alt={name}
                className="w-8 h-8 rounded-lg object-cover shadow"
              />
              <div className="text-lg font-medium">{name}</div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm line-clamp-4">{body}</div>
      </a>
    </div>
  )
}
