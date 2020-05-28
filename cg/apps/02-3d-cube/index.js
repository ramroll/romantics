import { Model, shape, matrix} from '../../lib'
import RenderContext from '../../lib/RenderContext'

function main() {
  const gl = RenderContext.getGL()
  const mesh = shape.d3_cube(100)
  const model = new Model(mesh)

  model.setVectorUniform('u_color', [Math.random(), Math.random(), Math.random(), 1.0])

  let angle = 0

  const aspect = gl.canvas.width / gl.canvas.height
  function draw(){
    model.setMatrixUniform('u_rotatez', matrix.rotateZ(angle))
    model.setMatrixUniform('u_rotatey', matrix.rotateY(angle))
    model.setMatrixUniform('u_project', matrix.perspective(Math.PI * 0.6, aspect, 1, 100))
    model.setMatrixUniform('u_view', [
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      0,0,-3,1
    ])
    model.draw()
    angle+=0.01
    requestAnimationFrame(draw)
  }
  draw()
}



main()