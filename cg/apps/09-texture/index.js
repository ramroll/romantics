import { Model, shape } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import { Mat4 } from '../../lib/matrix'

function main() {
  const gl = RenderContext.getGL()
  const mesh = shape.d3_cube()
  const model = new Model(mesh)

  const mat4 = new Mat4()
  const aspect = gl.canvas.width / gl.canvas.height
  model.setWorldMatrix(mat4
    .lookAt(0, 0, 10, 0, 0, 0)
    .perspective(Math.PI * 0.8, aspect, 1.0, 1000)
    .getMatrix())


  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clearDepth(1.0)
  gl.viewport(0.0, 0.0, canvas.width, canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  model.draw()
}

main()