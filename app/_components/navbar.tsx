import Link from "next/link"
import AnimatedBackground from "./animated-bg"
import { ModeToggle } from "./mode-toggle"

const navItems = {
  "/": {
    name: "home"
  },
  "/blog": {
    name: "blog"
  }
}
const TABS = ["home", "blog", "projects"]

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-10 tracking-tight sm:mb-16">
      <div className="lg:sticky lg:top-20">
        <nav
          className="relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex items-center space-x-0 pr-10 ">
            <AnimatedBackground
              defaultValue={TABS[0]}
              className="rounded-lg bg-primary/10"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3
              }}
              enableHover
            >
              {TABS.map((tab, index) => (
                <Link
                  href={`/${tab === "home" ? "/" : tab}`}
                  key={index}
                  data-id={tab}
                  type="button"
                  className="px-2 py-0.5 text-lg text-muted-foreground transition-colors hover:text-primary"
                >
                  {tab}
                </Link>
              ))}
            </AnimatedBackground>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </aside>
  )
}
