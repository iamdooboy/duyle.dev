import fs from 'fs'
import path from 'path'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Metadata = {
  title: string
  date: string
  description: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
