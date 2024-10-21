export type Point = {
  x: number
  y: number
}

export type Drawing = [x: number, y: number, pressure: number][]

export type CurrentDrawing = {
  color: string
  drawing: Drawing
}

export type Drawings = CurrentDrawing[]

export type Polaroid = {
  id: string
  name: string
  message: string
  drawing: Drawings
  x: number
  y: number
  z: number
  rotate: number
}

export type Cursor = {
  x: number
  y: number
}

export type Project = {
  name: string
  description: string
  link: string
  sourceCode: string
  imageSrc: string
  imageSrcDark: string
  longDescription: string
  color: string
}
