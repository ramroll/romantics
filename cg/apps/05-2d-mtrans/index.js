import { Model, loop, primitives, Scene, matrix } from "../../lib";
import Widget from '../../lib/widget'

function main() {

  const model = new Model({
    initialState : {
      x : 0,
      y : 0,
      deg :0
    },
    data: (gl) => {
      return {
        buffers: {
          a_position: {
            size: 2,
            data: primitives.d2_rect(0, 0, 200, 200),
            type: 'VERTEX'
          }
        },
        uniforms: {
          u_color: { type: 'VECTOR', value: [Math.random(), Math.random(), Math.random(), 1.0] },
          u_resolution: { type: 'VECTOR', value: [gl.canvas.width, gl.canvas.height] },
          u_model: {
            type: 'MATRIX',
            shape: [3, 3],
            value: ({ x, y, deg }) => {
              return matrix.multiply3d(
                matrix.translate2d(-100, -100),
                matrix.rotate2d(deg),
                matrix.translate2d(x, y)
              )
            }
          }
        }
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
        model.setState({x : value})
      },
      label : "x"
    },
    {
      type : "slider",
      range : [0, canvas.height],
      onChange : (value) => {
        model.setState({y : value})
      },
      label : "y"
    },
    {
      type : "slider",
      range : [0, Math.PI * 2],
      onChange : (value) => {
        model.setState({deg : value})
      },
      label : "deg"
    }
  ])

  const scene = new Scene()
  scene.add(model)
  widget.render()

  loop(() => {
    scene.render()
  })
}

main()