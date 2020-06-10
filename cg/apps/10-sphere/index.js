import { Model, shape } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import { Mat4 } from '../../lib/matrix'

function main() {
  const gl = RenderContext.getGL()
  const mesh = shape.d3_sphere(1)
  const model = new Model(mesh)

  const aspect = gl.canvas.width / gl.canvas.height
  model.addTextureImage('/texture05.jpg')

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
      .lookAt(0, 0, 2, 0, 0, 0)
      .perspective(Math.PI * 0.5, aspect, 1.0, 1000)
      .getMatrix())


    angle += 0.02
    model.draw()
    requestAnimationFrame(draw)
  }
  draw()

}

main()