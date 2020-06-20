import { Mesh } from "../model/Mesh"

export function d3_tiles(tiles, size, width, height) {

  const vertices = []
  const texCoords = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      const px = x * size 
      const py = y * size

      vertices.push(
        px, -1, py,
        px+size, -1, py,
        px+size, -1, py+size,

        px, -1 , py,
        px, -1, py + size,
        px + size, -1, py + size
      )

      texCoords.push(
        0, 0,
        1, 0,
        1, 1,
        0, 0,
        0, 1,
        1, 1
      )
    }
  }

  return new Mesh({vertices, texCoords})
}