import RenderContext from '../RenderContext'
import { GLArrayBuffer } from './GLArrayBuffer'
import _ from 'lodash'
import { GLUniform } from './GLUniform'
import StateManager from './StateManager'

export class Model {

  constructor({initialState, data}){
    this.gl = RenderContext.getGL() 
    this.program = RenderContext.getProgram()

    /*
     *  GL uniforms and buffers
     */
    this.buffers = []
    this.uniforms = []

    this.initialState = initialState
    this.initialize(data(this.gl))
  }

  initialize( rawData ) {
    this.stateManager = new StateManager(rawData)
    const {buffers, uniforms }= this.stateManager.getData()

    for(let key in buffers) {
      const {data, type, size} = buffers[key] 
      const name = key
      
      switch(type) {
        case 'VERTEX' : {
          const buffer = new GLArrayBuffer(name, size, data)
          buffer.useAsVertexBuffer()
          this.buffers.push(buffer)
          buffer.prepare()
          break
        }
        default : {
          throw "unkonw buffer type : " + type
        }
      }
    }

    for(let key in uniforms) {
      this.uniforms.push(new GLUniform(key, uniforms[key]))
    }
  }

  setState(obj) {
    this.stateManager.setState(obj)
  }

  applyUpdate = (update) => {
    const { path, value } = update
    const [cat, name, key] = path
    if (cat === 'buffers') {
      this.buffers.find(x => x.name === name).update(key, value)
    } else if (cat === 'uniforms') {
      this.uniforms.find(x => x.name === name).update(key, value)
    }
  }

  mutate(){
    this.stateManager.eval().forEach(this.applyUpdate)
  }

  applyArrayBuffers() {
    this.buffers.forEach(x => x.apply())
  }

  applyUniforms() {
    const {uniforms} = this.stateManager.getData()
    for(let uniform of this.uniforms) {
      uniform.updator(uniforms[uniform.name].value)
    }
  }


  render(){
    this.applyUniforms()
    this.applyArrayBuffers()

    let size = 0
    for(let buffer of this.buffers) {
      if(buffer.isVertexBuffer()) {
        size += buffer.data.length / buffer.size
      }
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, size);
  }
}