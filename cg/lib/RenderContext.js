import { initGL } from './boot/initGL'
import { initProgram } from './boot/initProgram'
export default class RenderContext {

  static gl = null
  static program = null

  static init(){
    if(RenderContext.gl){return}
    const gl = initGL()
    const program = initProgram(gl)
    gl.canvas.width = gl.canvas.clientWidth
    gl.canvas.height = gl.canvas.clientHeight
    RenderContext.program = program
    RenderContext.gl = gl 

  }

  static getGL(){
    this.init()
    return RenderContext.gl
  }

  static getProgram(){
    this.init()
    return RenderContext.program
  }

}
