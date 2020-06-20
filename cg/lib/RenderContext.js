import { initGL } from './boot/initGL'
import { initProgram } from './boot/initProgram'
import { Timing } from './time/Timing'
export default class RenderContext {

  static gl = null
  static timing = null
  static programs = {}

  static init(name = 'default'){
    if(RenderContext.gl){return}
    const gl = initGL()
    if(!RenderContext.programs[name]) {
      const program = initProgram(gl, name)
      RenderContext.programs[name] = program
    }
    gl.canvas.width = gl.canvas.clientWidth
    gl.canvas.height = gl.canvas.clientHeight
    RenderContext.gl = gl 
    RenderContext.timing = new Timing() 
    RenderContext.aspect = gl.canvas.width / gl.canvas.height
  }

  static getAspect() {
    return RenderContext.aspect
  }

  static getGL(){
    this.init()
    return RenderContext.gl
  }

  static getTiming(){
    this.init()
    return RenderContext.timing
  }

  static getProgram(name = 'default'){
    this.init(name)
    return RenderContext.programs[name]
  }

}
