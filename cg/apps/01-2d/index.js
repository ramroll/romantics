import { Model, shape } from '../../lib'
import RenderContext from '../../lib/RenderContext'

function main() {

  const gl = RenderContext.getGL()
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clearDepth(1.0)
  gl.viewport(0.0, 0.0, canvas.width, canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  const mesh = shape.d2_f(100, 100, 100, 150, 30)
  const model = new Model(mesh)
  model.setVectorUniform('u_color', [Math.random(), Math.random(), Math.random(), 1.0])
  model.setVectorUniform('u_resolution', [gl.canvas.width, gl.canvas.height])
  model.draw()
}

main()