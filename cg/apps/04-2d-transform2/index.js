import { Model, loop, primitives, Scene } from "../../lib";
import Widget from '../../lib/widget'

function main() {

  const model = new Model()
  let x = 0, y = 0
  /* 设置控制面板 */
  const canvas = document.getElementById('canvas')
  const widget = new Widget([
    {
      type : "slider",
      range : [0, canvas.width],
      onChange : (value) => {
        x = value
      },
      label : "x"
    },
    {
      type : "slider",
      range : [0, canvas.height],
      onChange : (value) => {
        y = value
      },
      label : "y"
    },
  ])

  model.initialize( () => {
    return {
      buffers : {
        a_position : {
          size : 2,
          data : primitives.d2_rect(0, 0, 200, 200),
          type : 'VERTEX'
        }
      },
      uniforms : {
        u_color: { value: [Math.random(), Math.random(), Math.random(), 1.0] },
        u_resolution: { value: [model.gl.canvas.width, model.gl.canvas.height] },
        translation: { value: [x, y] }
      }
    }
  })

  model.mutator( () => {
    return {
      uniforms: {
        translation: {
          value : [x, y] 
        }
      }
    }
  })


  const scene = new Scene()
  scene.add(model)
  widget.render()

  loop(() => {
    scene.render()
  })
}

main()