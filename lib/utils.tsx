import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colorVariants: { [key: string]: string } = {
  purple: "to-purple-300/70 dark:to-purple-300/30",
  blue: "to-blue-300/70 dark:to-blue-300/30",
  green: "to-green-300/70 dark:to-green-300/30",
  yellow: "to-yellow-300/70 dark:to-yellow-300/30",
  orange: "to-orange-300/70 dark:to-orange-300/30",
  red: "to-red-300/70 dark:to-red-300/30"
}
