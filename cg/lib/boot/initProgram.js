const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader)
  }
  return shader;
}

export const initProgram =  (gl) => {
  const vertexShaderSource = document.getElementById('vertex-shader').text
  const fragShaderSource = document.getElementById('fragment-shader').text

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fragShaderSource)

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragShader)
  gl.linkProgram(program)

  return program

}