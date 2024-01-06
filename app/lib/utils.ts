import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  date: string
  description: string
}

function parseContent(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

export function getBlogPosts() {
  const dir = path.join(process.cwd(), 'content')

  //get mdx files
  const mdxFiles = fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === '.mdx')

  return mdxFiles.map((file) => {
    //read mdx file
    const rawContent = fs.readFileSync(path.join(dir, file), 'utf-8')
    //format content
    const { metadata, content } = parseContent(rawContent)

    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content,
    }
  })
}
