import RenderContext from '../RenderContext'
export class Scene{

  constructor(){
    this.models = []
    this.gl = RenderContext.getGL()
    this.program = RenderContext.getProgram()
  }

  add(model) {
    this.models.push(model)
  }

  prepare(){
    console.log('--- prepare scene --')
    for(let model of this.models) {
      model.prepare()
    }    
  }

  render(){

    console.log('--- render scene --')
    const gl = this.gl
    const program = this.program
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    for(let model of this.models) {
      model.apply()
      model.render()
    }

  }
}