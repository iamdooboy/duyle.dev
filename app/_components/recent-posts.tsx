import { formatDate, getBlogPosts } from "@/lib/mdx-utils"
import Link from "next/link"

export function RecentPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .slice(0, 3)
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
            className="group mb-4 flex flex-col gap-1 transition-transform duration-300 hover:scale-105"
            href={`/blog/${post.slug}`}
          >
            <div>
              <p className="font-medium text-lg tracking-tight group-hover:underline">
                {post.metadata.title}
              </p>
              <p className="text-muted-foreground tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
