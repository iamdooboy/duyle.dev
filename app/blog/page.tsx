import { BlogPosts } from "@/components/blog-posts"

export const metadata = {
  title: "Blog",
  description: "Read my blog."
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 font-semibold text-2xl tracking-tighter">My Blog</h1>
      <BlogPosts />
    </section>
  )
}
