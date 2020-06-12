import { Model, shape } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import { Mat4, multiply4d } from '../../lib/matrix'
import Robot from './Robot'

function main() {
  const gl = RenderContext.getGL()

  const model = new Robot()

  const aspect = gl.canvas.width / gl.canvas.height

  let angle = 0 

  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    const mat4 = new Mat4()
    model.setWorldMatrix(mat4
      .rotate(0, angle, 0)
      .translate(0, 1, 0)
      .lookAt(1, 1, 3, 0, 0, 0)
      .perspective(Math.PI * 0.5, aspect, 1.0, 1000)
      .getMatrix())


    model.updateMatrix()
    model.draw()
    requestAnimationFrame(draw)
  }
  draw()

}

main()