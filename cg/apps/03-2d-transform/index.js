import { Model, loop, primitives, Scene } from "../../lib";
import Widget from '../../lib/widget'

function main() {

  const model = new Model({
    initialState:{x:0, y:0},
    data: (gl) => {
      return {
        buffers: {
          a_position: {
            size: 2,
            data: ({x, y}) => primitives.d2_f(x, y, 100, 150, 30),
            type: "VERTEX"
          },
        },
        uniforms: {
          u_color: {
            type: 'VECTOR',
            value: [Math.random(), Math.random(), Math.random(), 1.0]
          },
          u_resolution: {
            type: 'VECTOR',
            value: [gl.canvas.width, gl.canvas.height]
          },
        },
      }
    }
  })

  /* 设置控制面板 */
  const canvas = document.getElementById('canvas')
  const widget = new Widget([
    {
      type : "slider",
      range : [0, canvas.width],
      onChange : (value) => {
        model.setState({x:value})
      },
      label : "x"
    },
    {
      type : "slider",
      range : [0, canvas.height],
      onChange : (value) => {
        model.setState({y:value})
      },
      label : "y"
    },
  ])

  const scene = new Scene()
  scene.add(model)
  widget.render()

  loop(() => {
    scene.render()
  })
}

main()