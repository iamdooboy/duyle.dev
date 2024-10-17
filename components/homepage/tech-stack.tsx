"use client"

import { Icons } from "@/ui/icons"
import { motion } from "framer-motion"
import { useState } from "react"

const ICON_COLOR_MAP = {
  nextjs: "",
  html: "group-hover:text-[#E34F26]",
  css: "group-hover:text-[#1572B6]",
  typescript: "group-hover:text-[#3178C6]",
  tailwind: "group-hover:text-[#06B6D4]",
  framer: "",
  supabase: "group-hover:text-[#3FCF8E]",
  liveblocks: "",
  react: "group-hover:text-[#61DAFB]",
  radix: "",
  redux: "group-hover:text-[#764ABC]",
  shadcn: ""
}

const MOBILE_ICON_COLOR_MAP = {
  framer: "",
  html: "text-[#E34F26]",
  css: "text-[#1572B6]",
  typescript: "text-[#3178C6]",
  tailwind: "text-[#06B6D4]",
  nextjs: "",
  supabase: "text-[#3FCF8E]",
  liveblocks: "",
  react: "text-[#61DAFB]",
  radix: "",
  redux: "text-[#764ABC]",
  shadcn: ""
}

const TECH_MAP = {
  framer: "Framer Motion",
  html: "HTML 5",
  css: "CSS 3",
  typescript: "TypeScript",
  liveblocks: "Liveblocks",
  nextjs: "Next.js",
  tailwind: "Tailwind CSS",
  supabase: "Supabase",
  react: "React.js",
  radix: "Radix UI",
  redux: "Redux",
  shadcn: "shadcn/ui"
}

export function Techstack() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <>
      <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 pt-px pl-px bg-background">
        {Object.keys(ICON_COLOR_MAP).map((iconName, idx) => {
          const Icon = Icons[iconName as keyof typeof ICON_COLOR_MAP]
          return (
            <div
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={iconName}
              className="group relative flex select-none flex-col p-4 justify-center items-center group -ml-px -mt-px aspect-square"
            >
              {hoveredIndex === idx && (
                <>
                  <motion.span
                    layoutId="stack"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 bg-primary/10"
                  />
                  <div className="absolute text-muted-foreground mt-16 text-xs">
                    {TECH_MAP[iconName as keyof typeof TECH_MAP]}
                  </div>
                </>
              )}
              <Icon
                className={`size-10 transition-all duration-300 group-hover:-translate-y-2 ${ICON_COLOR_MAP[iconName as keyof typeof ICON_COLOR_MAP]}`}
              />
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-2 sm:hidden">
        {Object.keys(MOBILE_ICON_COLOR_MAP).map((iconName) => {
          const Icon = Icons[iconName as keyof typeof MOBILE_ICON_COLOR_MAP]
          return (
            <span
              key={iconName}
              className="text-foreground flex min-w-fit items-center rounded-md p-1 font-mono border bg-muted"
            >
              <Icon
                className={`size-4 ${MOBILE_ICON_COLOR_MAP[iconName as keyof typeof MOBILE_ICON_COLOR_MAP]}`}
              />
              <p className="ml-2 text-xs">
                {TECH_MAP[iconName as keyof typeof TECH_MAP]}
              </p>
            </span>
          )
        })}
      </div>
    </>
  )
}
