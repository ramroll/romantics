import RenderContext from '../RenderContext' 
export class Mesh {

  constructor({vertexes, indices = null, dimension = 3, colors = null}){
    this.dimension = dimension
    this.vertexes = vertexes
    this.indices = indices
    this.colors = colors
    this.gl = RenderContext.getGL()
    this.program = RenderContext.getProgram()

    this.vertexPosition = this.gl.getAttribLocation(this.program, 'a_position')

    if(this.colors) {
      this.colorsPosition = this.gl.getAttribLocation(this.program, 'a_color')
    }
    this.vertexBuffer = null 
    this.indicesBuffer = null
    this.init()
  }

  init(){
    this.vertexBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer)
    this.gl.enableVertexAttribArray(this.vertexPosition)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.vertexes),
      this.gl.STATIC_DRAW
    );

    if(this.indices) {
      this.indicesBuffer = this.gl.createBuffer()
      this.gl.bindBuffer(
        this.gl.ELEMENT_ARRAY_BUFFER, 
        this.indicesBuffer
      )
      this.gl.bufferData(
        this.gl.ELEMENT_ARRAY_BUFFER, 
        new Uint16Array(this.indices), 
        this.gl.STATIC_DRAW
      )
    }

    if(this.colors) {
      this.colorsBuffer = this.gl.createBuffer()
      this.gl.bindBuffer(
        this.gl.ARRAY_BUFFER,
        this.colorsBuffer
      )

      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(this.colors),
        this.gl.STATIC_DRAW
      )
    }
  }

  linkAttribute(){
    {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer)
      const type = this.gl.FLOAT
      const normalized = false
      const stride = 0
      const offset = 0
      this.gl.vertexAttribPointer(
        this.vertexPosition,
        this.dimension,
        type,
        normalized,
        stride,
        offset
      )
    }

    if(this.colors) {
      this.gl.enableVertexAttribArray(this.colorsPosition)
      this.gl.bindBuffer(
        this.gl.ARRAY_BUFFER,
        this.colorsBuffer
      )
      this.gl.vertexAttribPointer(this.colorsPosition, 3, this.gl.FLOAT, false,0,0)
    }

    if(this.indices) {
      this.gl.bindBuffer(
        this.gl.ELEMENT_ARRAY_BUFFER, 
        this.indicesBuffer
      )
    }

  }

  draw(){
    const gl = this.gl
    this.linkAttribute()
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    if(this.indices) {
      this.gl.drawElements(
        this.gl.TRIANGLES, 
        this.indices.length, 
        this.gl.UNSIGNED_SHORT, 0
      )
    } else {
      this.gl.drawArrays(
        this.gl.TRIANGLES, 
        0, 
        this.vertexes.length / this.dimension
      )
    }
  }

}
