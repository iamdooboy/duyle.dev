import { ModeToggle } from "@/header/mode-toggle"
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider
} from "@codesandbox/sandpack-react"
import { Code } from "bright"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import { ComponentProps, createElement } from "react"
import { setupReact } from "./setup-react"

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

type Props = {
  href: string
  children: React.ReactNode
}

function CustomLink(props: Props) {
  const href = props.href

  if (href.startsWith("/")) {
    return <Link {...props}>{props.children}</Link>
  }

  if (href.startsWith("#")) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function CodeHightlight({ children, ...props }: { children: string }) {
  Code.theme = {
    dark: "github-dark",
    light: "github-light"
  }
  return (
    <div>
      <div data-theme="dark" className="hidden dark:block">
        <Code lineNumbers {...props}>
          {children as any}
        </Code>
      </div>
      <div data-theme="light" className="block dark:hidden">
        <Code lineNumbers {...props}>
          {children as any}
        </Code>
      </div>
    </div>
  )
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    let slug = slugify(children)
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor"
        })
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

function Step({ ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      }
      {...props}
    />
  )
}

function Steps({ ...props }: React.ComponentProps<"h3">) {
  return (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  )
}

function CodeEditor(props: any) {
  const files = {
    "/ParentComponent.tsx": {
      code: props.parent
    },
    "/ChildComponent.tsx": {
      code: props.child
    },
    "/ExpensiveComponent.tsx": {
      code: props.expensive
    }
  }
  return (
    <SandpackProvider
      theme="dark"
      {...setupReact({
        files: files,
        main: "ParentComponent"
      })}
    >
      <SandpackLayout>
        <SandpackCodeEditor
          style={{ minWidth: "100%" }}
          showLineNumbers
          showTabs
        />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  )
}

function Next(props: any) {
  return (
    <SandpackProvider
      options={{
        externalResources: ["https://cdn.tailwindcss.com"]
      }}
      theme="dark"
      template="react"
      files={{
        "/App.js": `${props.code}`
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor style={{ minWidth: "100%", height: "100%" }} />
        <SandpackPreview style={{ height: "100%" }} />
      </SandpackLayout>
    </SandpackProvider>
  )
}

function Highlight({ children }: { children: string }) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  )
}

function Callout(props: any) {
  return (
    <div className="px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout leading-relaxed">{props.children}</div>
    </div>
  )
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: CodeHightlight,
  Table,
  CodeEditor,
  Highlight,
  Callout,
  ModeToggle,
  Next,
  Step,
  Steps
}

export function CustomMDX(props: ComponentProps<any>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
