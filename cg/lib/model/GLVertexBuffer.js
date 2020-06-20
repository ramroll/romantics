
import RenderContext from '../RenderContext'
export default class GLVertexBuffer {

  constructor(name, data, dimension = 3, mode) {
    
    this.dimension = dimension
    this.gl = RenderContext.getGL()
    this.name = name
    /* 初始化Buffer */
    this.buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER, 
      data, 
      mode || this.gl.STATIC_DRAW
    )
    this.data = data

  }

  associate(){
    this.location = 
      this.gl.getAttribLocation(RenderContext.getProgram(), this.name)
    this.gl.enableVertexAttribArray(this.location)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)
    const type = this.gl.FLOAT
    const normalized = false
    const stride = 0
    const offset = 0
    this.gl.vertexAttribPointer(
      this.location,
      this.dimension,
      type,
      normalized,
      stride,
      offset
    )
  }


}