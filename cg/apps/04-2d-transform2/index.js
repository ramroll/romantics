import { Model, loop, primitives } from "../../lib";
import Widget from '../../lib/widget'
import RenderContext from '../../lib/RenderContext'

function main() {
  
  const gl = RenderContext.getGL()
  const mesh = primitives.d2_f(100, 100, 100, 150, 30)
  const model = new Model(mesh)
  model.setVectorUniform('u_color', [Math.random(), Math.random(), Math.random(), 1.0])
  model.setVectorUniform('u_resolution', [gl.canvas.width, gl.canvas.height])
  /* 设置控制面板 */
  const canvas = document.getElementById('canvas')

  const translation = [0, 0]
  const widget = new Widget([
    {
      type : "slider",
      range : [0, canvas.width],
      onChange : (value) => {
        translation[0] = value
        model.setVectorUniform('u_translation', translation)
      },
      label : "x"
    },
    {
      type : "slider",
      range : [0, canvas.height],
      onChange : (value) => {
        translation[1] = value
        model.setVectorUniform('u_translation', translation)
      },
      label : "y"
    },
  ])
  widget.render()

  loop(() => {
    model.draw()
  })
}

main()