import { Mesh } from "../model/Mesh"


export const d3_sphere = (r = 1, n = 200, m = 100) => {

  // [0, 2pi]
  const vertices = []
  const indices = []
  const colors = []
  const norms = []
  const texCoords = []
  for (let y = 0; y <= m; y++) {
    for (let x = 0; x <= n; x++) {

      const u = x / n
      const v = y / m

      const theta = u * Math.PI * 2
      const phi = v * Math.PI

      const py = Math.cos(phi) * r
      const px = Math.sin(phi) * Math.cos(theta) * r
      const pz = Math.sin(phi) * Math.sin(theta) * r
      // colors.push(Math.random(), Math.random(), Math.random(), 1)
      texCoords.push(1-u, v)
      vertices.push(px, py, pz)
      norms.push(px, py, pz)
    }
  }



  for(let x = 0; x < n; x++) {
    for(let y = 0; y < m; y++) {
      // (x, y+1) , (x+1, y+1)
      // (x, y) (x+1, y)

      indices.push(
        x + y * (n+1),
        x+1 + y * (n+1),
        x + (y+1) * (n+1)
      )

      indices.push(
        x+1 + y * (n+1),
        x + (y+1) * (n+1),
        x+1 + (y+1) * (n+1),
      )
    }
  }

  return new Mesh({vertices, indices, texCoords, norms})
}

