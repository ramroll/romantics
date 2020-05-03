import { Model, loop, primitives, Scene } from "../../lib";
import Widget from '../../lib/widget'

function main() {

  /* 设置控制面板 */
  const canvas = document.getElementById('canvas')
  const widget = new Widget([
    {
      type : "slider",
      range : [0, canvas.width],
      onChange : (value) => {
      },
      label : "x"
    },
    {
      type : "slider",
      range : [0, canvas.height],
      onChange : (value) => {
      },
      label : "y"
    }
  ])
  const model = new Model()

  model.mutator(() => {
    return {
      buffers : [
        {
          name: "a_position",
          size: 2,
          data: primitives.d2_rect(100, 100, 200, 200),
          type : "VERTEX" 
        },
      ],
      uniforms: [
        ["u_color", [Math.random(), Math.random(), Math.random(), 1.0]],
        ["u_resolution", model.gl.canvas.width, model.gl.canvas.height],
      ],
    };
  })


  const scene = new Scene()
  scene.add(model)
  scene.prepare()


  widget.render()

  loop(() => {
    scene.render()
  })
}

main()