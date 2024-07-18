import React from 'react'
import NextImage from 'next/image'
import { Code } from 'bright'
import { MDXComponents } from 'mdx/types'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { cn } from '@/lib/utils'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

function Callout(props: any) {
  return (
    <div className='mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'>
      <div className='mr-4 flex w-4 items-center'>{props.emoji}</div>
      <div className='callout w-full'>{props.children}</div>
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  pre: ({
    children,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLPreElement
  >) => {
    return (
      <Code {...props} theme='github-dark'>
        {children as any}
      </Code>
    )
  },
  Strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
  img: MDXImage as any,
  Image: NextImage as any,
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'font-heading mt-2 scroll-m-20 text-4xl font-bold',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  Pkg: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <p
      className={cn('rounded bg-muted font-mono text-sm', className)}
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn('relative mt-3 w-full', className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        'w-full justify-start rounded-none bg-transparent p-0',
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        'text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none',
        className
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        'relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold',
        className
      )}
      {...props}
    />
  ),
  Callout: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <div className='mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'>
      <div className='mr-4 flex w-4 items-center'>💡</div>
      <div className='callout w-full'>{props.children}</div>
    </div>
  ),
}

export function MDXImage({
  src,
  alt,
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string
  alt: string
}) {
  let widthFromSrc, heightFromSrc
  const url = new URL(src, 'https://duyle.dev')
  const widthParam = url.searchParams.get('w') || url.searchParams.get('width')
  const heightParam =
    url.searchParams.get('h') || url.searchParams.get('height')
  if (widthParam) {
    widthFromSrc = parseInt(widthParam)
  }
  if (heightParam) {
    heightFromSrc = parseInt(heightParam)
  }

  const imageProps = {
    src,
    alt,
    height: heightFromSrc || 450,
    width: widthFromSrc || 550,
  }

  return <NextImage {...imageProps} />
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...mdxComponents, ...(props.components || {}) }}
    />
  )
}
