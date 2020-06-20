import RenderContext from '../RenderContext'

function powerOf2(value) {
  return (value & (value - 1)) == 0
}



const textures = []

let id_counter = 0
export class ImageTexture {

  static textures = {}

  static createTextureIfNotExits(src){
    const gl = RenderContext.getGL()
    if (!textures[src]) {
      const texture = gl.createTexture();
      gl.bindTexture(
        gl.TEXTURE_2D,
        texture
      );
      gl.texImage2D(
        gl.TEXTURE_2D, // bind point(target)
        0, // level of detail(0 代表整张图片， n代表第n级的mipmap)
        gl.RGBA, // internal format 格式
        1, // width
        1, // height
        0, // border
        gl.RGBA, // 格式(format)
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 255, 0, 255])
      );

      const id = id_counter ++ 
      textures[src] = {
        texture,
        id 
      }

      const image = new Image();
      image.src = src;
      image.addEventListener(
        "load",
        () => {
          gl.activeTexture(
            gl.TEXTURE0 + id
          );
          gl.bindTexture(
            gl.TEXTURE_2D,
            texture
          );
          gl.texImage2D(
            gl.TEXTURE_2D, // bind point
            0, // level of detail
            gl.RGBA, // internal format
            gl.RGBA, // format
            gl.UNSIGNED_BYTE, // type
            image
          );

          // 产生mipmap的行为
          if (
            powerOf2(image.width) &&
            powerOf2(image.height)
          ) {
            gl.generateMipmap(
              gl.TEXTURE_2D
            );
          } else {
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_WRAP_S,
              gl.CLAMP_TO_EDGE
            );
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_WRAP_T,
              gl.CLAMP_TO_EDGE
            );
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_MIN_FILTER,
              gl.NEAREST
            );
          }
        }
      );
    }
    return textures[src]
  }
  constructor(src, name = 'u_texture'){
    const gl = RenderContext.getGL()
    this.name = name
    this.src = src
    this.gl = gl
    this.texture = ImageTexture.createTextureIfNotExits(src)
  }


  associate(){
    this.textureLocation = this.gl.getUniformLocation(RenderContext.getProgram(), this.name)
    this.gl.uniform1i(this.textureLocation, this.texture.id)
  }
  
}