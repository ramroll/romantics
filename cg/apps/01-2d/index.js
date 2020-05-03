import { Model, primitives, Scene } from '../../lib'

function main() {

  const model = new Model()

  model.mutator(() => {
    return {
      buffers : [
        {
          name: "a_position",
          size: 2,
          data: primitives.F(100, 100, 100, 150, 30),
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
  scene.render()
  
}

main()