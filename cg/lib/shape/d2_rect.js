import { Mesh } from '../model/Mesh'
export const d2_rect = (x, y, width, height) => {

  const data = [
    x, y,
    x + width, y,
    x, y + height,
    x, y + height,
    x + width, y + height,
    x + width, y 
  ]

  return new Mesh({vertices : data, dimension : 2})
}