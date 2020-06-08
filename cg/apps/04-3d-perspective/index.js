import { Model, shape, matrix} from '../../lib'
import RenderContext from '../../lib/RenderContext'
import Widget from '../../lib/widget'

function main() {


  const gl = RenderContext.getGL()
  const mesh = shape.d3_cube(100)
  const model = new Model(mesh)

  let zNear = 1.0
  let zFar = 100.0
  let fov = Math.PI * 0.6 
  let zPos = 3 
  const widget = new Widget([
    {
      type : "slider",
      range : [-10, 20],
      defaultValue : zNear,
      onChange : (value) => {
        zNear = value
      },
      label : "zNear"
    },
    {
      type : "slider",
      range : [10, 1000],
      defaultValue : zFar,
      onChange : (value) => {
        zFar = value
      },
      label : "zFar"
    },
    {
      type : 'slider',
      defaultValue : fov,
      range : [0, Math.PI],
      onChange : (value) => {
        fov = value
      },
      label : "fov"

    },
    {
      type : 'slider',
      defaultValue :zPos,
      range : [1, 10],
      onChange : (value) => {
        zPos = value
      },
      label : "zpos" 
    }
  ])
  widget.render()

  let angle = 0

  const aspect = gl.canvas.width / gl.canvas.height
  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    model.setMatrixUniform('u_rotatez', matrix.rotateZ(angle))
    model.setMatrixUniform('u_rotatey', matrix.rotateY(angle))
    model.setMatrixUniform('u_project', 
      matrix.perspective(fov, aspect, zNear, zFar))
    model.setVectorUniform('u_zpos', [0, 0, zPos])
    // model.setMatrixUniform('u_view', [
    //   1,0,0,0,
    //   0,1,0,0,
    //   0,0,1,0,
    //   0,0,-3,1
    // ])
    model.draw()
    angle+=0.01
    requestAnimationFrame(draw)
  }
  draw()
}



main()