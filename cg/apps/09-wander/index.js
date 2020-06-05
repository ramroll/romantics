import "regenerator-runtime/runtime"
import { Model, shape, matrix, Mesh } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import {Mesh as OBJMesh} from 'webgl-obj-loader'

function lookAtMatrix(x, y, z, angleX, angleY, angleZ, fov, aspect, zNear, zFar) {
  return new matrix.Mat4()
    // .scale(2/210, -2/210, 2/210)
    .translate(-x, -y, -z)
    .rotate(-angleX, -angleY, -angleZ)
    .perspective(fov, aspect, zNear, zFar)
    .getMatrix()
}


async function load() {
  
  const resp = await fetch('/1.obj')
  const data = await resp.text()
  return data
}

  

async function main() {
  const data = await load()
  const meshData = new OBJMesh(data)
  console.log(meshData)
  const colors = []
  for(let i = 0; i <meshData.vertices.length; i++) {
    colors[i] = meshData.indicesPerMaterial[0][i] / 255
  }
  const mesh = new Mesh({indices : meshData.indices, vertices : meshData.vertices, colors })
  const model = new Model(mesh)
  const gl = RenderContext.getGL()

  const aspect = gl.canvas.width / gl.canvas.height

  let ax = 0
  let ay = 0
  let x = 0
  let y = 0
  let z = 300
  gl.canvas.addEventListener('mousemove', e => {
    const x = e.clientX
    const y = e.clientY
    ax = (2 * y / gl.canvas.height) - 1
    ay = 2 * x / gl.canvas.width - 1

    ax *= Math.PI * 2
    ay *= Math.PI * 2
  })

  window.addEventListener('keydown', e => {
    const speed = 0.2
    const dz = -Math.cos(ay) * speed
    const dx = Math.sin(ay) * speed
    switch(e.key) {
      case 'ArrowUp':
        z += dz
        x += dx
        break
      case 'ArrowDown':
        z -= dz
        x -= dx
        break
    }
  })

  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    model.setWorldMatrix(lookAtMatrix(
      x, y, z, ax, ay, 0,
      Math.PI * 0.8,
      aspect,
      1.0,
      1000.0
    ))
    model.draw()
    requestAnimationFrame(draw)
  }
  draw()
}



main()