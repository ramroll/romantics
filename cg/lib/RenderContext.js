import { initGL } from "./boot/initGL";
import { initProgram } from "./boot/initProgram";
import { Timing } from "./time/Timing";
export default class RenderContext {
  static gl = null;
  static timing = null;
  static programs = {};

  static init() {

    if(RenderContext.gl) {
      return
    }
    const gl = initGL()
    gl.canvas.width = gl.canvas.clientWidth;
    gl.canvas.height = gl.canvas.clientHeight;
    RenderContext.gl = gl;
    RenderContext.timing = new Timing();
    RenderContext.aspect = gl.canvas.width / gl.canvas.height;
    RenderContext.currentProgram = null
  }

  static initProgram(name = 'default') {
    const gl = RenderContext.gl
    if (!RenderContext.programs[name]) {
      const program = initProgram(gl, name);
      RenderContext.programs[name] = program;
    }
    if(name === 'default') {
      RenderContext.gl.useProgram(RenderContext.programs['default'])
    }
  

  }

  static getAspect() {
    return RenderContext.aspect;
  }

  static getGL() {
    this.init();
    return RenderContext.gl;
  }

  static getTiming() {
    this.init();
    return RenderContext.timing;
  }


  static getProgram() {
    this.init();
    if(!RenderContext.currentProgram) {
      this.initProgram('default')
      RenderContext.currentProgram = RenderContext.programs['default']
    }
    return RenderContext.currentProgram
  }

  static switchProgram(name) {
    this.init()
    this.initProgram(name)
    RenderContext.currentProgram = RenderContext.programs[name]
    RenderContext.gl.useProgram(RenderContext.currentProgram)
  }
}
