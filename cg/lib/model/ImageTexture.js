import RenderContext from '../RenderContext'

function powerOf2(value) {
  return (value & (value - 1)) == 0
}

export class ImageTexture {
  constructor(src){
    const gl = RenderContext.getGL()
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 255, 0, 255])
    )

    const image = new Image()
    image.src = src
    image.addEventListener('load', () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image)

      if(powerOf2(image.width) && powerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D)
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      }
    })

    const program = RenderContext.getProgram()
    const textureLocation = gl.getUniformLocation(program, "u_texture")
    gl.uniform1i(textureLocation, 0)
  }

  
}