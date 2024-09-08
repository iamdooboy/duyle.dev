import { MoveRight } from "lucide-react"
import Link from "next/link"

export const More = ({
  href,
  children
}: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      className="flex gap-1 items-center font-bold hover:text-muted-foreground"
      href={href}
    >
      {children}
      <MoveRight className="size-4" />
    </Link>
  )
}
