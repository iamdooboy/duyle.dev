"use client"

import React, { useState, useEffect } from "react"

export const Time = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    })
  }

  return (
    <div className="text-sm text-muted-foreground tabular-nums font-mono">{formatTime(time)} CDT</div>
  )
}
