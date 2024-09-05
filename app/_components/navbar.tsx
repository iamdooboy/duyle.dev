import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

const navItems = {
  "/": {
    name: "home"
  },
  "/blog": {
    name: "blog"
  }
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] sm:mb-16 mb-10 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex items-center space-x-0 pr-10 ">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
            <ModeToggle />
          </div>
        </nav>
      </div>
    </aside>
  )
}
