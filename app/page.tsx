import { Card } from "./_components/card"
import { More } from "./_components/more"
import { RecentPosts } from "./_components/recent-posts"
import { TechStack } from "./_components/tech-stack"
import { Title } from "./_components/title"

import { projects } from "./config"

export default function Page() {
  return (
    <>
      <section className="h-full">
        <h1 className="mb-8 font-semibold text-2xl tracking-tighter">
          Hi, I'm Duy (doo·ee).
        </h1>
        <p className="mb-4 text-primary">
          I like to{" "}
          <span className="font-semibold">learn, build, and iterate.</span> I'm
          a creative web developer with a passion for UI design and crafting
          high quality and fun side projects.
        </p>
        <TechStack />
        <div className="my-8">
          <Title>Recent posts</Title>
          <RecentPosts />
          <More href="/blog">More posts</More>
        </div>
        <div className="my-8">
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
