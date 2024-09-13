import { Button } from "../_components/button"
import Safari from "../_components/safari"
import { projects } from "../config"

export const metadata = {
  title: "Projects",
  description: "Explore my projects."
}

const colorVariants: { [key: string]: string } = {
  purple: "to-purple-300/70 dark:to-purple-300/30",
  blue: "to-blue-300/70 dark:to-blue-300/30",
  green: "to-green-300/70 dark:to-green-300/30",
  yellow: "to-yellow-300/70 dark:to-yellow-300/30",
  orange: "to-orange-300/70 dark:to-orange-300/30",
  red: "to-red-300/70 dark:to-red-300/30"
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 font-semibold text-2xl tracking-tighter">
        My Projects
      </h1>
      <div className="flex flex-col justify-between my-3 sm:gap-8 divide-dotted divide-y-2 sm:divide-none group/card">
        {projects.map((project) => (
          <div
            className="py-10 first:pt-0 sm:p-0 last:pb-0 group-hover/card:blur-sm hover:!blur-none group/image"
            key={project.name}
          >
            <div
              className={`px-5 z-10 overflow-hidden bg-gradient-to-t from-[#00000000] ${colorVariants[project.color]} rounded-md`}
            >
              <Safari
                url={`https://duyle.dev`}
                className="size-full transform translate-y-5 group-hover/image:-translate-y-[1px] duration-200 transition-transform"
                src={project.imageSrc}
              />
            </div>
            <div className="flex flex-col mt-2 gap-2">
              <h3 className="text-lg font-medium">{project.name}</h3>
              <p className="text-sm text-muted-foreground">
                {project.longDescription}
              </p>
              <div className="flex gap-3">
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    Source
                  </Button>
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Visit
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
