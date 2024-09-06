import { BentoCard, BentoGrid } from "./_components/bento-grid"
import { BlogPosts } from "./_components/blog-posts"
import { Moon } from "lucide-react"

export default function Page() {
  const features = [
    {
      Icon: Moon,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3"
    },
    {
      Icon: Moon,
      name: "Full text search",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
    },
    {
      Icon: Moon,
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4"
    }
  ]
  return (
    <>
      <section className='h-full'>
        
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          My Portfolio
        </h1>
        <p className="mb-4">
          {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
        </p>
        <div className="my-8">
          <BlogPosts />
        </div>
      </section>
    </>
  )
}
