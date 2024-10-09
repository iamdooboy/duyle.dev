"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { ModeToggle } from "./mode-toggle"

const TABS = ["blog", "projects", "visitors"]

export const TabHeaders = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex items-center">
      {TABS.map((tab, index) => (
        <Link
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          href={`/${tab}`}
          key={index}
          data-id={tab}
          type="button"
          className="relative px-2 py-0.5 text-lg flex items-center justify-center text-center hover:text-primary/85"
        >
          {hoveredIndex === index && (
            <motion.span
              layoutId="stack"
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute inset-0 rounded-md bg-primary/10"
            />
          )}
          {tab}
        </Link>
      ))}
      <ModeToggle />
    </div>
  )
}
