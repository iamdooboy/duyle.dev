"use client"

import React from "react"
import { AuroraBackground } from "@/ui/aurora-bg"
import { Navbar } from "./nav"

export function AuroraBackgroundDemo() {
  return (
    <div className='relative'>
      <AuroraBackground className="h-full relative">
        <Navbar />
      </AuroraBackground>
    </div>
  )
}
