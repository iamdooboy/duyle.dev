import { Button } from "../../components/ui/button"
import { Icons } from "../../components/ui/icons"
import Safari from "../../components/ui/safari"
import {
  VideoModal,
  VideoModalContent,
  VideoModalDescription,
  VideoModalTitle,
  VideoModalTrigger,
  VideoModalVideo,
  VideoPlayer
} from "../../components/ui/video-modal"
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
      <div className="flex flex-col justify-between my-3 sm:gap-24 gap-2">
        {projects.map((project) => (
          <div className="py-10 first:pt-0 sm:p-0 last:pb-0" key={project.name}>
            <div
              className={`px-5 z-10 overflow-hidden bg-gradient-to-t from-[#00000000] ${colorVariants[project.color]} rounded-md`}
            >
              <VideoModal>
                <VideoModalTrigger className="relative group/video">
                  <Safari
                    url={`https://duyle.dev`}
                    className="dark:hidden size-full transform translate-y-5 group-hover/video:-translate-y-[1px] duration-200 transition-transform"
                    src={project.imageSrc}
                  />
                  <Safari
                    url={`https://duyle.dev`}
                    className="hidden dark:block size-full transform translate-y-5 group-hover/video:-translate-y-[1px] duration-200 transition-transform"
                    src={project.imageSrcDark}
                  />
                  <div className="hidden absolute inset-0 group-hover/video:flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl ">
                    <div className="bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md size-28">
                      <div
                        className={`flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary shadow-md rounded-full size-20 transition-all ease-out duration-200 relative hover:scale-[1.2] scale-100`}
                      >
                        <Icons.play
                          className="size-8 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                          style={{
                            filter:
                              "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </VideoModalTrigger>
                <VideoModalContent>
                  <VideoModalTitle>{project.name} Demo</VideoModalTitle>
                  <VideoModalDescription>
                    {project.longDescription}
                  </VideoModalDescription>
                  <VideoModalVideo>
                    <VideoPlayer>
                      <iframe
                        className="size-full"
                        src="https://cdn.magicui.design/globe.mp4"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                      />
                    </VideoPlayer>
                  </VideoModalVideo>
                </VideoModalContent>
              </VideoModal>
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
                  <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground gap-2">
                    <Icons.github className="size-4" />
                    Source
                  </Button>
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Icons.globe className="size-4" />
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
