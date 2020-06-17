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

    this.updateMatrix()

  }

}

function lookAtMatrix(x, y, z, angleX, angleY, angleZ, fov, aspect, zNear, zFar) {

  console.log(-angleY)
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


  let x = 0, y = 0, z = 4,
    ax = 0.0, 
    ay = 0.0, 
    az = 0.0


  const widget = new Widget([
    {
      type: "slider",
      range: [-20, 20],
      defaultValue: x,
      onChange: (value) => {
        x = value
      },
      label: "x"
    },
    {
      type: "slider",
      range: [-20, 20],
      defaultValue: y,
      onChange: (value) => {
        y = value
      },
      label: "y"
    },
    {
      type: "slider",
      range: [-20, 20],
      defaultValue: z,
      onChange: (value) => {
        z = value
      },
      label: "z"
    },
    {
      type: 'slider',
      defaultValue: ax,
      range: [0, 2*Math.PI],
      onChange: (value) => {
        ax = value
      },
      label: "ax"
    },
    {
      type: 'slider',
      defaultValue: ay,
      range: [0, 2*Math.PI],
      onChange: (value) => {
        ay = value
      },
      label: "ay"
    },
    {
      type: 'slider',
      defaultValue: az,
      range: [0, 2*Math.PI],
      onChange: (value) => {
        az = value
      },
      label: "az"
    },
  ])
  widget.render()
  const aspect = gl.canvas.width / gl.canvas.height
  function draw(){
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    angle += 0.01
    m1.setWorldMatrix(lookAtMatrix(
      x, y, z, ax, ay, az,
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