import { Mesh } from "../model/Mesh"


export const d3_sphere = (r = 1, n = 20, m = 10) => {

  const vertices = []
  const colors = []
  const texCoords = []
  for(let y = 0; y <= m ; y++) {
    for(let x = 0; x <= n ; x ++) {
      const u = x/n;
      const v = y/m;
      const theta = 2*Math.PI * u
      const phi = Math.PI * v 
      // (r, phi, thet a)
      // 顶点编号:y * 100 + x, 或者计为(x, y)
      vertices.push(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
      )
      colors.push(Math.random(), Math.random(), Math.random(), 1)
      texCoords.push(1-u, v)
    }
  }

  // (x,y) (x+1, y), (x, y+1), (x+1, y+1)


  const indices = []
  const idx = (a, b) => {
    return a + b * (n + 1)
  }
  for(let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      indices.push(
        idx(x, y),
        idx(x+1, y),
        idx(x, y+1),
      )

      indices.push(
        idx(x, y+1),
        idx(x+1, y),
        idx(x+1, y+1)
      )
    }
  }
  
  return new Mesh({vertices, indices, texCoords})

}

