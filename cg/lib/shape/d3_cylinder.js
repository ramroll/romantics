import {Mesh} from '../model/Mesh'
export const d3_cylinder = (r, l, n = 100) => {


  const vertices = []
  const indices = []
  const texCoords = []
  const norms = []
  // const colors = []
  for(let i = 0; i <= n; i++) {

    const u = i / n
    const theta = Math.PI * 2 * u
    const x = r * Math.cos(theta)
    const z = r * Math.sin(theta)
    vertices.push(x, -l/2, z)
    norms.push(x, -l/2, 0)
    texCoords.push(u, 0)
    vertices.push(x, l/2, z)
    norms.push(x, l/2, 0)
    texCoords.push(u, 1)
    // colors.push(Math.random(), Math.random(), Math.random(), 1)
    // colors.push(Math.random(), Math.random(), Math.random(), 1)
  }

  for(let i = 0; i < n; i++) {
    indices.push(i*2, i*2+1, (i+1)*2)
    indices.push(i*2+1, (i+1)*2, (i+1)*2+1)
  }

  return new Mesh({vertices, indices,norms, texCoords})
}