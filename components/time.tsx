"use client"

import React, { useState, useEffect } from "react"

export const Time: React.FC = () => {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    const updateTime = () => setTime(new Date())

    // Update time immediately
    updateTime()

    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short"
    })
  }

  if (!time) return null

  return (
    <div className="text-sm text-muted-foreground tabular-nums font-mono">
      {formatTime(time)}
    </div>
  )
}
