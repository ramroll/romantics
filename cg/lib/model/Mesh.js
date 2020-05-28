import RenderContext from '../RenderContext' 
import GLIndexBuffer from './GLIndexBuffer'
import GLVertexBuffer from './GLVertexBuffer'

export class Mesh {

  constructor({vertexes, indices = null, dimension = 3, colors = null}){
    this.dimension = dimension
    this.vertexes = vertexes
    this.indices = indices
    this.colors = colors
    this.gl = RenderContext.getGL()
    this.program = RenderContext.getProgram()

    this.vertexBuffer = new GLVertexBuffer(
      'a_position', 
      new Float32Array(vertexes), 
      dimension
    )

    if(this.colors) {
      this.colorsBuffer = new GLVertexBuffer(
        'a_color',
        new Float32Array(colors),
        dimension
      )
    }

    if(this.indices) {
      this.indicesBuffer = new GLIndexBuffer(
        new Uint16Array(this.indices),
        dimension
      )
    }
  }

  draw(){
    const gl = this.gl
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    this.vertexBuffer.associate()
    this.colorsBuffer && this.colorsBuffer.associate()
    this.indicesBuffer && this.indicesBuffer.associate()

    if(this.indicesBuffer) {
      gl.drawElements(
        gl.TRIANGLES, 
        this.indices.length,
        gl.UNSIGNED_SHORT,
        0
      )
    } else {

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        this.vertexes.length / this.dimension
      )
    }
  }

}
