import { identity3d, identity4d, multiply4d } from '../matrix'
import RenderContext from '../RenderContext'
import { ImageTexture } from './ImageTexture'
export class Model {

  constructor(mesh, dimensions = 3, level = 0){
    this.mesh = mesh
    this.worldMatrix = dimensions === 3 ? identity4d() 
      : identity3d()
    this.unitMatrix = dimensions === 3 ? identity4d()
      : identity3d()
    this.gl = RenderContext.getGL()
    this.program = RenderContext.getProgram()
    this.gl.useProgram(this.program)
    this.children = []
    this.level = level

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

  setUnitMatrix(unitMatrix) {
    this.unitMatrix = unitMatrix
  }

  setWorldMatrix(worldMatrix) {
    this.worldMatrix = worldMatrix
  }

  addChild(model){
    model.parent = this
    this.children.push(model)
  }

  addTextureImage(src) {
    this.textureImage = new ImageTexture(src)
  }

  updateMatrix(parentWorldMatrix, parentUnitMatrix) {

    if(parentUnitMatrix) {
      this.worldMatrix =
        multiply4d(
          parentUnitMatrix,
          parentWorldMatrix
        )
    }
    for(let child of this.children) {
      child.updateMatrix(
        this.worldMatrix, this.unitMatrix
      )
    }
  }

  draw(){
    this.setMatrixUniform('u_unit', this.unitMatrix)
    this.setMatrixUniform('u_world', this.worldMatrix)

    if(this.mesh) {
      this.textureImage && this.textureImage.associate()
      this.mesh.draw()
    }

    this.children.forEach(child => child.draw())

  }

}