"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Icons } from "../ui/icons"

const ICON_COLOR_MAP = {
  nextjs: "",
  html: "group-hover:text-[#E34F26]",
  css: "group-hover:text-[#1572B6]",
  typescript: "group-hover:text-[#3178C6]",
  framer: "",
  tailwind: "group-hover:text-[#06B6D4]",
  supabase: "group-hover:text-[#3FCF8E]",
  liveblocks: "",
  react: "group-hover:text-[#61DAFB]",
  redux: "group-hover:text-[#764ABC]"
}

const TECH_MAP = {
  nextjs: "Next.js",
  html: "HTML 5",
  css: "CSS 3",
  typescript: "TypeScript",
  liveblocks: "Liveblocks",
  framer: "Framer Motion",
  tailwind: "Tailwind CSS",
  supabase: "Supabase",
  react: "React.js",
  redux: "Redux"
}

export function Techstack() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 pt-px pl-px">
      {Object.keys(ICON_COLOR_MAP).map((iconName, idx) => {
        const Icon = Icons[iconName as keyof typeof ICON_COLOR_MAP]
        return (
          <div
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={iconName}
            className="group relative flex select-none flex-col p-4 justify-center items-center group border -ml-px -mt-px aspect-square"
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
              className={`size-10 sm:size-8 transition-all duration-300 group-hover:-translate-y-2 ${ICON_COLOR_MAP[iconName as keyof typeof ICON_COLOR_MAP]}`}
            />
          </div>
        )
      })}
    </div>
  )
}
