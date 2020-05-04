import { Model, primitives, Scene } from '../../lib'

function main() {

  const model = new Model({
    data: (gl) => {
      return {
        buffers: {
          a_position: {
            size: 2,
            data: primitives.d2_f(100, 100, 100, 150, 30),
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

  const scene = new Scene()

  scene.add(model)
  scene.render()
  
}

main()