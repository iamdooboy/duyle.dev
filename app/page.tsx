import { BlogPosts } from "@/components/blog-posts"
import { Card } from "@/components/homepage/card"
import { More } from "@/components/homepage/more"
import { Techstack } from "@/components/homepage/tech-stack"
import { Title } from "@/components/homepage/title"
import { projects } from "./config"

export default function Page() {
  return (
    <>
      <section className="h-full">
        <h1 className="mb-8 font-semibold text-2xl tracking-tighter">
          Hey, I'm Duy (doo·ee) 👋
        </h1>
        <p className="mb-4 text-primary">
          I like to &nbsp;
          <span className="font-bold">learn, build, and iterate.</span> I'm a
          creative web developer with a passion for UI design and crafting high
          quality and fun web apps.
        </p>
        <div className="my-6 space-y-5">
          <p>Programming languages and libraries I'm currently using</p>
          <Techstack />
        </div>
        <div className="my-16">
          <Title>Recent posts</Title>
          <BlogPosts limit={2} />
          <More href="/blog">More posts</More>
        </div>
        <div className="my-16">
          <Title>Recent projects</Title>
          <div className="grid grid-cols-2 gap-4 my-3">
            {projects.slice(0, 2).map((project) => (
              <Card
                key={project.name}
                body={project.description}
                image={project.imageSrc}
                name={project.name}
                link={project.link}
              />
            ))}
          </div>
          <More href="/projects">More projects</More>
        </div>
      </section>
    </>
  )
}
