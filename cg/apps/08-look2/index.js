import { Model, shape, matrix } from '../../lib'
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

  }
}

function lookAtMatrix(x, y, z, angleX, angleY, angleZ, fov, aspect, zNear, zFar) {
  return new matrix.Mat4()
    .scale(2/210, -2/210, 2/210)
    .translate(-x, -y, -z)
    .rotate(-angleX, -angleY, -angleZ)
    .perspective(fov, aspect, zNear, zFar)
    .getMatrix()
}


function main() {
  const gl = RenderContext.getGL()
  const m1 = new LotFs(300)
  let angle = 0


  const aspect = gl.canvas.width / gl.canvas.height
  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    angle += 0.001
    m1.setWorldMatrix(lookAtMatrix(
      Math.sin(angle)*5, 0, Math.cos(angle) * 5, 0, angle, 0,
      Math.PI * 0.8,
      aspect,
      1.0,
      100.0
    ))
    m1.updateMatrix()
    m1.draw()
    requestAnimationFrame(draw)
  }
  draw()
}



main()