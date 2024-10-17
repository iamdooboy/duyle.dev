type Props = {
  color: string
  x: number
  y: number
}

export function Cursor({ color, x, y }: Props) {
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1000,
        transform: `translateX(${x}px) translateY(${y}px)`
      }}
      width="36"
      height="48"
      viewBox="0 0 36 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="dark:stroke-white stroke-muted shadow-2xl"
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
        strokeWidth={1.5}
      />
    </svg>
  )
}
