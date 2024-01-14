import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { CopyButton } from '@/components/copy-button'
import { CustomMDX } from '@/components/mdx'
import { getBlogPosts } from '@/app/lib/utils'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className='space-y-2 pt-5'>
      <div className='text-muted-foreground flex items-center justify-between'>
        <Link href='/blog' className='flex hover:underline'>
          <ChevronLeft className='mr-2' />
          <div className='font-mono font-semibold'>All posts</div>
        </Link>
        <CopyButton />
      </div>
      <h1 className='text-xl font-semibold tracking-tighter'>
        {post.metadata.title}
      </h1>
      <div className='mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          {post.metadata.date}
        </p>
      </div>
      <article className='prose prose-quoteless prose-neutral dark:prose-invert pt-5'>
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}

function formatDate(date: string) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${formattedDate})`
}
