import { Model, shape, matrix} from '../../lib'
import RenderContext from '../../lib/RenderContext'

function main() {


  const gl = RenderContext.getGL()

  const models = []
  const mesh = shape.d3_f()
  for(let i = 0; i <10; i++) {
    models.push(new Model(mesh))
  }

  let angle = 0

  const aspect = gl.canvas.width / gl.canvas.height

  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    for(let i = 0; i <10; i++) {
      const model = models[i]
      let world = matrix.identity4d()
      world = matrix.multiply4d(world, matrix.scale3d(2 / 210, -2 / 210, 2 / 210))
      world = matrix.multiply4d(world, matrix.translate3d(0, 0, -3))
      world = matrix.multiply4d(world, matrix.rotateY(angle+2*i*Math.PI / 10))
      world = matrix.multiply4d(world, matrix.perspective(
        Math.PI * 0.5,
        aspect,
        1.0,
        1000
      ))
      model.setWorldMatrix(world)
    }

    
    // angle += 0.01
    // for (let i = 0; i < 10; i++) {
    //   let world = matrix.identity4d()
    //   world = matrix.multiply4d(world, matrix.scale3d(2 / 210, -2 / 210, 2 / 210))
    //   world = matrix.multiply4d(world, matrix.translate3d(-1, 1, -2))
    //   world = matrix.multiply4d(world, matrix.rotateY((i/5)*Math.PI + angle))
    //   // world = matrix.multiply4d(world, matrix.translate3d(0, 0, -5))
    //   world = matrix.multiply4d(world, matrix.perspective(
    //     Math.PI * 0.5,
    //     aspect,
    //     1.0,
    //     1000
    //   ))
    //   models[i].setWorldMatrix(world)
    // }
    // for(let i = 0; i < 10; i++) {
    //   // console.log(i)
    //   models[i].draw()
    // }
    angle+=0.01
    for(let i = 0; i < 10; i++) {
      models[i].draw()
    }
    requestAnimationFrame(draw)
  }
  draw()
}



main()