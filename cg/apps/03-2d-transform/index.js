import { Model, loop, shape} from "../../lib";
import Widget from '../../lib/widget'
import RenderContext from '../../lib/RenderContext'
import { identity3d, translate2d, multiply3d } from "../../lib/matrix";

function main() {
  
  const gl = RenderContext.getGL()
  // const worldMatrix = [
  //   2/gl.canvas.width, 0, -1, 
  //   0, 2/gl.canvas.height, -1,
  //   0, 0, 1
  // ]
  const worldMatrix = [
    2/gl.canvas.width, 0, 0,
    0, -2/gl.canvas.height,0,
    -1, +1, 1
  ]


  const mesh = shape.d2_f(0, 0, 100, 150, 30)
  const model = new Model(mesh)
  model.setWorldMatrix(worldMatrix)
  model.setVectorUniform('u_color', [Math.random(), Math.random(), Math.random(), 1.0])
  /* 设置控制面板 */

  let translate = [0, 0]


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
  ])
  widget.render()

  loop(() => {
    let uMatrix = identity3d()
    const matTranslate = translate2d(translate[0], translate[1])
    uMatrix = multiply3d(uMatrix, matTranslate)
    model.setUntiMatrix(uMatrix)
    model.draw()
  })
}

main()