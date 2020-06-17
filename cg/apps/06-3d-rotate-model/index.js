import { Model, shape, matrix} from '../../lib'
import RenderContext from '../../lib/RenderContext'
import Widget from '../../lib/widget'


class LotFs extends Model{

  constructor(size) {
    const mesh = shape.d3_f()
    super(null)
    this.size = size

    for(let i = 0; i < 10; i++) {
      const f = new Model(mesh)
      let unitMatrix = matrix.translate3d(0, 0, -size)
      unitMatrix = 
        matrix.multiply4d(unitMatrix, matrix.rotateY(2* i *Math.PI / 10))
      f.setUnitMatrix(unitMatrix)
      this.addChild(f)
    }
  }

  setSize(size) {
    for(let i = 0; i < 10; i++) {
      let unitMatrix = matrix.translate3d(0, 0, -size)
      unitMatrix = matrix.multiply4d(unitMatrix, matrix.rotateY(i * Math.PI / 5))
      this.children[i].setUnitMatrix(unitMatrix)
    }

    this.updateMatrix()

  }

  
  rotate(angle) {
    const aspect = this.gl.canvas.width / this.gl.canvas.height
    let world = matrix.identity4d()
    world = matrix.multiply4d(world, matrix.scale3d(2 / 210, -2 / 210, 2 / 210))
    world = matrix.multiply4d(world, matrix.rotateY(angle))
    world = matrix.multiply4d(world, matrix.rotateX(-0.5))
    world = matrix.multiply4d(world, matrix.translate3d(-1, 1, -10))
    world = matrix.multiply4d(world, matrix.perspective(
      Math.PI * 0.5,
      aspect,
      1.0,
      1000
    ))
    this.setWorldMatrix(world)
    this.updateMatrix()
  }

}


function main() {


  const gl = RenderContext.getGL()
  const m1 = new LotFs(100)
  const m2 = new LotFs(200)
  const m3 = new LotFs(300)

  let angle = 0
  let r = 300
  let d = 15
  function draw(){
    m1.rotate(angle)
    m1.setSize(r)
    r+=d
    if(r > 1200) {
      d = -d
    }
    if(r < 300) {
      d = -d
    }
    m2.rotate(angle)
    m3.rotate(angle)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    angle += 0.1
    m1.draw()
    m2.draw()
    m3.draw()
    requestAnimationFrame(draw)
  }
  draw()
}



main()