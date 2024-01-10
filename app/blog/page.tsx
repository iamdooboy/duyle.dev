import Link from 'next/link'

import { getBlogPosts } from '../lib/utils'

export default function BlogListPage() {
  const posts = getBlogPosts()

  return (
    <div className='space-y-2 pt-5 '>
      <div className='items-center pb-2 font-mono font-semibold'>All posts</div>
      <div className='flex flex-col gap-2'>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className='border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md border p-4'
          >
            <div className='font-semibold'>{post.metadata.title}</div>
            <div className='text-muted-foreground text-sm'>
              {post.metadata.date}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
