import NextImage from 'next/image'
import { Code } from 'bright'
import { MDXComponents } from 'mdx/types'
import { MDXRemote } from 'next-mdx-remote/rsc'

export const mdxComponents: MDXComponents = {
  pre: ({
    children,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLPreElement
  >) => {
    return (
      <Code {...props} theme='material-default'>
        {children as any}
      </Code>
    )
  },
  img: MDXImage as any,
  Image: NextImage as any,
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
