import { Model, shape, matrix } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import { Mat4, multiply4d } from '../../lib/matrix'
import { d3_cube, d3_sphere } from '../../lib/shape'

function main() {
  const gl = RenderContext.getGL()

  //const model = new Model( d3_sphere(.8, 20, 20) )
  const model = new Model(d3_cube(true, false, true)) 
  const aspect = gl.canvas.width / gl.canvas.height
  let angle = 0

  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    model.setWorldMatrix(
      new Mat4()
      .rotate(0, angle, 0)
      .translate(0, 0, -1)
      .getMatrix())


    model.setMatrixUniform(
      "u_worldview",
      new Mat4()
        .lookAt(0,0,3,0,0,0)
        .perspective(Math.PI * 0.5, aspect, 1.0, 1000)
        .getMatrix()
    )

    model.setVectorUniform('u_light', [0, 0, -1])

    // angle += 0.01
    model.updateMatrix()
    model.draw()
    requestAnimationFrame(draw)
  }
  draw()

}

main()