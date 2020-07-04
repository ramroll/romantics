import { Mesh } from "../model/Mesh"

export function d3_tiles(tiles, size, width, height) {

  const vertices = []
  const texCoords = []
  const colors = []
  const ids = []
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

      const id = x * 1000 + y
      //console.log(id)
      
      for (let k = 0; k < 6; k++) {
        colors.push(
          (id & 255) / 255,
          ((id >> 8) & 255) / 255,
          ((id >> 16) & 255) / 255
        );
      }
      ids.push(id, id, id, id, id, id)

    }
  }

  const mesh = new Mesh({vertices, texCoords, colors})
  return mesh
}