import { Icons } from "@/ui/icons"
import Link from "next/link"

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
