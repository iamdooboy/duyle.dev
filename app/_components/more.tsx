import Link from "next/link"
import { Icons } from "./icons"

export const More = ({
  href,
  children
}: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      className="flex items-center gap-1 font-semibold hover:text-muted-foreground"
      href={href}
    >
      {children}
      <Icons.RightArrow className="size-4" />
    </Link>
  )
}
