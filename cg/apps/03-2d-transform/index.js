import { Model, loop, shape} from "../../lib";
import Widget from '../../lib/widget'
import RenderContext from '../../lib/RenderContext'
import { identity3d, translate2d, multiply3d, rotate2d, scale2d } from "../../lib/matrix";

function main() {
  
  const gl = RenderContext.getGL()
  const worldMatrix = [
    2/gl.canvas.width, 0, 0,
    0, -2/gl.canvas.height,0,
    -1, +1, 1
  ]

  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clearDepth(1.0)
  gl.viewport(0.0, 0.0, canvas.width, canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


  const mesh = shape.d2_f(0, 0, 100, 150, 30)
  const model = new Model(mesh)
  model.setWorldMatrix(worldMatrix)
  model.setVectorUniform('u_color', [Math.random(), Math.random(), Math.random(), 1.0])
  /* 设置控制面板 */

  let translate = [0, 0]
  let rotate = 0
  let scale = 1.0


  const widget = new Widget([
    {
      type : "slider",
      range : [0, gl.canvas.width],
      onChange : (value) => {
        translate[0] = value
      },
      label : "x"
    },
    {
      type : "slider",
      range : [0, gl.canvas.height],
      onChange : (value) => {
        translate[1] = value
      },
      label : "y"
    },
    {
      type : 'slider',
      range : [0, 2 * Math.PI],
      onChange : (value) => {
        rotate = value
      },
      label : "r"

    },
    {
      type : 'slider',
      range : [0.1, 3],
      onChange : (value) => {
        scale = value
      },
      label : "s" 
    }
  ])
  widget.render()

  loop(() => {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    let uMatrix = identity3d()
    const matTranslate = translate2d(translate[0], translate[1])
    const matRotate = rotate2d(rotate)
    const matScale = scale2d(scale, scale)
    // 思考尝试使用不同的顺序的到的结果为什么不一样？
    // uMatrix = multiply3d(uMatrix, matTranslate, matScale, matRotate)
    // uMatrix = multiply3d(uMatrix, matScale, matTranslate, matRotate)
    const matBeforeRotate = translate2d(-50, -75)
    const matAfterRotate = translate2d(50, 75)
    // console.log(matBeforeRotate)
    uMatrix = multiply3d(
      uMatrix, 
      matBeforeRotate, 
      matRotate, 
      matAfterRotate, 
      matScale, 
      matTranslate,
    )
    model.setUnitMatrix(uMatrix)
    model.draw()
  })
}

main()