import RenderContext from '../RenderContext'
export class GLArrayBuffer{

  constructor(name, size, data) {
    this.name = name
    this.size = size
    this.data = data
    this.gl = RenderContext.getGL()
    this.program = RenderContext.getProgram()
    this.position = this.gl.getAttribLocation(this.program, name)
    this.buffer = this.gl.createBuffer()
    this.flagVertexBuffer = false
  }

  useAsVertexBuffer() {
    this.flagVertexBuffer = true
  }

  isVertexBuffer(){
    return this.flagVertexBuffer
  }

  prepare() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.data),
      this.gl.STATIC_DRAW
    );
  }

  apply(){
    this.gl.enableVertexAttribArray(this.position)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)
    const type = this.gl.FLOAT
    const normalized = false
    const stride = 0
    const offset = 0
    this.gl.vertexAttribPointer(
      this.position,
      this.size,
      type,
      normalized,
      stride,
      offset
    )
  }


}