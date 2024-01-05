import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Metadata = {
  title: string;
  date: string;
  description: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    const value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXData(dir) {
 
}

export function getBlogPosts() {

  const dir = path.join(process.cwd(), 'content')
  
   //get mdx files
   const mdxFiles = fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');

   return mdxFiles.map((file) => {
     //read mdx file
     const rawContent = fs.readFileSync(path.join(dir, file), 'utf-8');
     //format content
     const { metadata, content } = parseFrontmatter(rawContent);
 
     const slug = path.basename(file, path.extname(file));
     return {
       metadata,
       slug,
       content,
     };
   });
}