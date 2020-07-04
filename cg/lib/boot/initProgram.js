const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

    const err = 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader)
    gl.deleteShader(shader);
    throw err
  }
  return shader;
}

export const initProgram =  (gl, name) => {

  let vShaderId = 'vertex-shader'
  let fShaderId = 'fragment-shader'
  if(name !== 'default') {
    vShaderId += '-' + name
    fShaderId += '-' + name

  }
  console.log(vShaderId)
  const vertexShaderSource = document.getElementById(vShaderId).text
  const fragShaderSource = document.getElementById(fShaderId).text

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fragShaderSource)

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragShader)
  gl.linkProgram(program)

  return program

}