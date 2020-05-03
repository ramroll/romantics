import RenderContext from '../RenderContext'
import { GLArrayBuffer } from './GLArrayBuffer'
export class Model {

  constructor(){
    this.gl = RenderContext.getGL() 
    this.program = RenderContext.getProgram()
    this.size = 0
    this.state = {
      buffers : [],
      uniforms : []
    }
    this.buffers = []
    this.mutators = []
  }

  mutator(mutator){
    this.mutators.push(mutator)
  }

  prepare(){
    for(let mutator of this.mutators) {
      this.state = {...this.state, ...mutator(this.state)}
    }

    for(let meta of this.state.buffers) {
      const {name, data, type, size} = meta
      
      switch(type) {
        case 'VERTEX' : {
          const buffer = new GLArrayBuffer(name, size, data)
          buffer.useAsVertexBuffer()
          this.buffers.push(buffer)
          buffer.prepare()
          break;
        }
        default : {
          throw "unkonw buffer type : " + type
        }
      }
    }
  }

  apply() {
    this.applyUniforms()
    this.applyArrayBuffers()
  }


  applyArrayBuffers() {
    for(let buffer of this.buffers) {
      buffer.apply()
    }
  }

  applyUniforms() {
    for(let uniform of this.state.uniforms) {
      const [name, ...arg] = uniform
      this.gl.uniformAny(this.program, name, ...arg)
    }
  }


  render(){
    let size = 0
    for(let buffer of this.buffers) {
      if(buffer.isVertexBuffer()) {
        size += buffer.data.length / buffer.size
      }
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, size);
  }
}