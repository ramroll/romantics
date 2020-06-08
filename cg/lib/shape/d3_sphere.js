import { Mesh } from "../model/Mesh"

export const d3_sphere = (r = 1, n = 10) => {

  // 生成顶点
  const colors = []
  const vertices = []
  for (let y = 0; y <= n; y++) {
    for (let x = 0; x <= n; x++) {
      const u = x / n
      const v = y / n
      const theta = 2 * Math.PI * u
      const phi = Math.PI * v
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)
      const sinPhi = Math.sin(phi)
      const cosPhi = Math.cos(phi);
      const ux = cosTheta * sinPhi
      const uy = cosPhi
      const uz = sinTheta * sinPhi
      vertices.push(r * ux, r* uy, r* uz)
      colors.push(Math.random(), Math.random(), Math.random())
    }
  }

  // 生成索引
  const indices = []
  for(let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      indices.push(
        y*(n+1) + x,
        y*(n+1) + x+1,
        (y+1)*(n+1) +x
      )

      indices.push(
        (y+1)*(n+1) + x,
        y*(n+1) + x+1,
        (y+1)*(n+1) + x+1
      )
    }
  }


  return new Mesh({vertices, indices, colors})

}