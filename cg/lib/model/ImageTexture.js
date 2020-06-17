import RenderContext from '../RenderContext'

function powerOf2(value) {
  return (value & (value - 1)) == 0
}


let id_counter = 0
export class ImageTexture {
  constructor(src){
    const gl = RenderContext.getGL()
    const texture = gl.createTexture()
    this.src = src
    this.texture = texture
    this.id = id_counter ++
    gl.activeTexture(gl.TEXTURE0 + this.id)
    this.gl = gl
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
      gl.TEXTURE_2D, // bind point(target)
      0, // level of detail(0 代表整张图片， n代表第n级的mipmap)
      gl.RGBA, // internal format 格式
      1, // width
      1,  // height
      0,  // border
      gl.RGBA, // 格式(format) 
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 255, 0, 255])
    )

    const image = new Image()
    image.src = src
    image.addEventListener('load', () => {
      gl.activeTexture(gl.TEXTURE0 + this.id)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(
        gl.TEXTURE_2D, // bind point
        0, // level of detail
        gl.RGBA, // internal format
        gl.RGBA, // format
        gl.UNSIGNED_BYTE, // type
        image
      )

      // 产生mipmap的行为
      if (powerOf2(image.width) && powerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D)
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      }
    })


    const program = RenderContext.getProgram()
    this.textureLocation = gl.getUniformLocation(program, 'u_texture')
  }


  associate(){
    this.gl.uniform1i(this.textureLocation, this.id)
  }
  
}