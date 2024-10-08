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
  zod: "group-hover:text-[#3E67B1]",
  react: "group-hover:text-[#61DAFB]",
  redux: "group-hover:text-[#764ABC]"
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
            className="relative flex select-none flex-col p-4 justify-center items-center group border -ml-px -mt-px"
          >
            {hoveredIndex === idx && (
              <motion.span
                layoutId="stack"
                transition={{ type: "spring", duration: 0.5 }}
                className="absolute inset-0 bg-primary/10"
              />
            )}
            <Icon
              className={`size-8 transition-colors duration-300 ${ICON_COLOR_MAP[iconName as keyof typeof ICON_COLOR_MAP]}`}
            />
          </div>
        )
      })}
    </div>
  )
}
