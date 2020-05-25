import RenderContext from '../RenderContext'
export class GLUniform{

  constructor(name, options){
    this.options = options 
    this.name = name
    const gl = RenderContext.getGL()
    const program = RenderContext.getProgram()
    const location = gl.getUniformLocation(program, name)
    const { value, type, shape } = options

    this.value = value

    const throwError =  () => {
      throw `uniform updator of type:${type} is not defined`
    }
    this.updator = throwError 
    switch(type) {
      case 'VECTOR' : {
        if(value.length === 2) {
          this.updator = (data) => {
            this.value = value
            gl.uniform2fv(location, data) 
          } 
        }
        else if(value.length === 3) {
          this.updator = (data) => {
            this.value = value
            gl.uniform3fv(location, data)
          }
        }
        else if(value.length === 4) {
          this.updator = (data) => {
            this.value = value
            gl.uniform4fv(location, data)
          }
        }
        break
      }
      case 'MATRIX' : {
        if(!shape) {
          throw "Matrix uniform must have property shape specified"
        }
        if(shape[0] === 3) {
          this.updator = (data) => {
            this.value = value
            gl.uniformMatrix3fv(location, false, data)
          }
        } else if(shape[0] === 4) {
          this.updator = (data) =>{
            this.value = value
            gl.uniformMatrix4fv(location, data)
          }
        }
        break
      }
    }
    if(this.updator === throwError) {
      this.updator()
    }
  }

  update(key, value) {
    if(key === 'value') {
      this.updator(value)
    }
  }

}