import { initGL, initProgram, primitives, Model } from "../../lib";

function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */

  const model = new Model()
  const gl = model.gl
  const program = model.program
  model.mutator(state => {
    return {
      attributes: [["a_position", primitives.F(0, 0, 150, 100, 30)]],
    };
  })


  // lookup uniforms
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  var colorLocation = gl.getUniformLocation(program, "u_color");

  model.prepare()
  model.applyAttributes()
;
  var color = [Math.random(), Math.random(), Math.random(), 1];

  drawScene();

  // Draw a the scene.
  function drawScene() {

    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);



    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set the color
    gl.uniform4fv(colorLocation, color);

    model.render()
    // Draw the rectangle.
    // var primitiveType = gl.TRIANGLES;
    // var offset = 0;
    // var count = 18;
    // gl.drawArrays(primitiveType, offset, count);
  }
}

// Fill the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(primitives.F(0, 0, 150, 100, 30)),
      gl.STATIC_DRAW);
}

main();
