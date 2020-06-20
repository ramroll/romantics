import { Model, shape, matrix } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import { Mat4, multiply4d } from '../../lib/matrix'
import { d3_cube, d3_sphere } from '../../lib/shape'
import Widget from '../../lib/widget'

function main() {
  const gl = RenderContext.getGL()


  let light_x = 0,
    light_y  = 0,
    light_z = 0
  const widget = new Widget([
    {
      type : "slider",
      range : [-5, 5],
      onChange : (value) => {
        light_x = value
      },
      defaultValue :light_x,
      label : "x"
    },
    {
      type : "slider",
      range : [-5, 5],
      defaultValue : light_y,
      onChange : (value) => {
        light_y = value
      },
      label : "y"
    },
    {
      type : 'slider',
      defaultValue : light_z,
      range : [-5, 5],
      onChange : (value) => {
        light_z = value
      },
      label : "z"
    },
  ])
  widget.render()

  //const model = new Model( d3_sphere(.8, 20, 20) )
  const model = new Model(d3_cube(true, false, true)) 
  const aspect = gl.canvas.width / gl.canvas.height
  let angle = Math.PI *0.3 

  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    model.setWorldMatrix(
      new Mat4()
      .rotate(0, angle, 0)
      .translate(0, 0, -2)
      .getMatrix())


    const camera = [0, 0, 3]
    model.setMatrixUniform(
      "u_worldview",
      new Mat4()
        .lookAt(...camera,0,0,0)
        .perspective(Math.PI * 0.5, aspect, 1.0, 1000)
        .getMatrix()
    )

    model.setVectorUniform('u_light', [light_x, light_y, light_z])
    model.setVectorUniform('u_camera', camera)

    angle += 0.01
    model.updateMatrix()
    model.draw()
    requestAnimationFrame(draw)
  }
  draw()

}

main()