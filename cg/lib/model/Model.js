import { identity3d, identity4d, multiplynd } from '../matrix'
import RenderContext from '../RenderContext'
export class Model {

  constructor(mesh, dimensions = 3){
    this.mesh = mesh
    this.worldMatrix = dimensions === 3 ? identity4d() 
      : identity3d()
    this.unitMatrix = dimensions === 3 ? identity4d()
      : identity3d()
    this.gl = RenderContext.getGL()
    this.program = RenderContext.getProgram()
    this.gl.useProgram(this.program)
    this.children = []

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
    this.children.forEach(child => {
      child.setWorldMatrix(worldMatrix)
    })
  }

  addChild(model){
    model.parent = this
    this.children.push(model)
  }


  draw(){
    this.setMatrixUniform('u_unit', this.unitMatrix)
    this.setMatrixUniform('u_world', this.worldMatrix)

    if(this.mesh) {
      this.mesh.draw()
    }

    this.children.forEach(child => child.draw())

  }

}