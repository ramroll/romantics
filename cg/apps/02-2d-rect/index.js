import { Model, primitives, Scene } from '../../lib'

function main() {

  const model = new Model()

  model.initialize(() => {
    return {
      buffers : {
        a_position : {
          size: 2,
          data: primitives.d2_rect(100, 100, 100, 150),
          type : "VERTEX" 
        },
      },
      uniforms: {
        u_color : {
          value : [Math.random(), Math.random(), Math.random(), 1.0]
        },
        u_resolution :  {
          value : [model.gl.canvas.width, model.gl.canvas.height]
        },
      },
    };
  })

  const scene = new Scene()

  scene.add(model)
  scene.render()
  
}

main()