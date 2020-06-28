
import RenderContext from '../RenderContext'
export default class GLIndexBuffer {

  constructor(data, dimension = 3, mode) {
    
    this.dimension = dimension
    this.gl = RenderContext.getGL()
    
    /* 初始化Buffer */
    this.buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffer)
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER, 
      data, 
      mode || this.gl.STATIC_DRAW
    )
  }

  associate(){
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffer)
  }


}