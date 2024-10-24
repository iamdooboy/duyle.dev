import { useTheme } from "next-themes"
import getStroke from "perfect-freehand"

type Props = {
  points: number[][]
  fill: string
  onPointerDown?: (e: React.PointerEvent) => void
}

export const Path = ({ onPointerDown, fill, points }: Props) => {
  const { theme } = useTheme()

  const getFillColor = (color: string) => {
    if (color === "eraser") {
      if (theme === "dark") {
        return "#c5c5c5"
      } else {
        return "#d9d9d9"
      }
    }
    return fill
  }

  const newFill = getFillColor(fill)

  return (
    <path
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
          simulatePressure: false
        })
      )}
      x={0}
      y={0}
      fill={newFill}
      strokeWidth={1}
    />
  )
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"]
  )

  d.push("Z")
  return d.join(" ")
}
