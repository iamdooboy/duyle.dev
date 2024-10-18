import HyperText from "./hyper-text"
import { TabHeaders } from "./tab-headers"

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-10 tracking-tight sm:mb-16">
      <div className="lg:sticky lg:top-20">
        <nav className="relative flex items-center scroll-pr-6 justify-end px-0 pb-0 md:relative md:overflow-auto">
          <a href="/" className="first:mr-auto pl-2">
            <HyperText text="Duy Le" className="text-2xl font-bold" />
            <div>
              <h1 className="text-2xl font-mono font-bold sm:hidden block">
                DL
              </h1>
            </div>
          </a>
          <TabHeaders />
        </nav>
      </div>
    </aside>
  )
}
