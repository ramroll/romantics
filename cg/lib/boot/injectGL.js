export default function injectGL(gl) {

  gl.uniformAny = (program, locationName, ...args) => {
    console.log("---Set Uniform--")
    const location = gl.getUniformLocation(program, locationName)
    if(args.length === 1) {
      const v = args[0]
      if(v.length === 2) {
        gl.uniform2fv(location, v)
        return
      } else if(v.length === 3) {
        gl.uniform3fv(location, v)
        return
      } else if(v.length === 4) {
        gl.uniform4fv(location, v)
        return
      } 
    } else {
      if(args.length === 2) {
        gl.uniform2f(location, ...args)
        return
      } else if(args.length === 3) {
        gl.uniform3f(location, ...args)
      } else if(args.length === 4) {
        gl.uniform4f(location, ...args)
      }
    }

    throw "illigal arguments."
  }
}