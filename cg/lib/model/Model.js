import { identity3d } from '../matrix'
import RenderContext from '../RenderContext'
export class Model {

  constructor(mesh){
    this.mesh = mesh
    this.worldMatrix = identity3d() 
    this.unitMatrix = identity3d()
    this.gl = RenderContext.getGL()
    this.program = RenderContext.getProgram()
    this.gl.useProgram(this.program)
0
  }


  setVectorUniform(name, value) {
    const position = this.gl.getUniformLocation(this.program, name)
    if(value.length === 2) {
      this.gl.uniform2fv(position, value)
    } else if(value.length === 3) {
      this.gl.uniform3fv(position, value)
    } else if(value.length === 4) {
      this.gl.uniform4fv(position, value)
    }
  }

  setMatrixUniform(name, value) {
    const position = this.gl.getUniformLocation(this.program, name)
    if(value.length === 4) {
      this.gl.uniformMatrix2fv(position, false, value)
    } else if(value.length === 9) {
      this.gl.uniformMatrix3fv(position, false, value)
    } else if(value.length === 16) {
      this.gl.uniformMatrix4fv(position, false, value)
    }
  }

  setUntiMatrix(unitMatrix) {
    this.unitMatrix = unitMatrix
  }

  setWorldMatrix(worldMatrix) {
    this.worldMatrix = worldMatrix
  }

  draw(){
    const gl = this.gl

    this.setMatrixUniform('u_unit', this.unitMatrix)
    this.setMatrixUniform('u_world', this.worldMatrix)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    this.mesh.draw()
  }

}