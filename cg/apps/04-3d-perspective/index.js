import { Model, shape, matrix} from '../../lib'
import RenderContext from '../../lib/RenderContext'

function main() {


  const gl = RenderContext.getGL()
  const mesh = shape.d3_cube(100)
  const model = new Model(mesh)

  let zNear = 1.0
  let zFar = 100.0
  let fov = Math.PI * 0.6 
  let zPos = 10
  const widget = new Widget([
    {
      type : "slider",
      range : [0, 100],
      onChange : (value) => {
        zNear = value 
      },
      label : "zNear"
    },
    {
      type : "slider",
      range : [0, 100],
      onChange : (value) => {
        zFar = value
      },
      label : "zFar"
    },
    {
      type : 'slider',
      range : [0, Math.PI],
      onChange : (value) => {
        fov = value
      },
      label : "fov"

    },
    {
      type : 'zpos',
      range : [0, 100],
      onChange : (value) => {
        zPos = value
      },
      label : "s" 
    }
  ])
  widget.render()

  let angle = 0

  const aspect = gl.canvas.width / gl.canvas.height
  function draw(){
    model.setMatrixUniform('u_rotatez', matrix.rotateZ(angle))
    model.setMatrixUniform('u_rotatey', matrix.rotateY(angle))
    model.setMatrixUniform('u_project', 
      matrix.perspective(fov, aspect, zNear, zFar))
    model.setVectorUniform('u_zpos', [0, 0, zPos])
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