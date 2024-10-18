import { formatDate, getBlogPosts } from "@/lib/mdx-utils"
import Link from "next/link"

export function BlogPosts({ limit }: { limit?: number }) {
  let allBlogs = getBlogPosts()

  if (limit) {
    allBlogs = allBlogs.slice(0, limit + 1)
  }

  return (
    <div className="flex flex-col gap-3">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="mb-4 flex flex-col gap-1 hover:translate-x-2 transition-all duration-400 hover:border-l-4 hover:pl-2"
            href={`/blog/${post.slug}`}
          >
            <p className="tracking-tight">{post.metadata.title}</p>
            <p className=" text-muted-foreground tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
          </Link>
        ))}
    </div>
  )
}
