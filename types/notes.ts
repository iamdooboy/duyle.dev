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
