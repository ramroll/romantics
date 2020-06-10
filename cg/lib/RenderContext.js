import { initGL } from './boot/initGL'
import { initProgram } from './boot/initProgram'
import { Timing } from './time/Timing'
export default class RenderContext {

  static gl = null
  static program = null
  static timing = null

  static init(){
    if(RenderContext.gl){return}
    const gl = initGL()
    const program = initProgram(gl)
    gl.canvas.width = gl.canvas.clientWidth
    gl.canvas.height = gl.canvas.clientHeight
    RenderContext.program = program
    RenderContext.gl = gl 
    RenderContext.timing = new Timing() 
  }

  static getGL(){
    this.init()
    return RenderContext.gl
  }

  static getTiming(){
    this.init()
    return RenderContext.timing
  }

  static getProgram(){
    this.init()
    return RenderContext.program
  }

}
