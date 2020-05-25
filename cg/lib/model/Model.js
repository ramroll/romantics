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

  draw(){
    const gl = this.gl
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.mesh.draw()
  }

}