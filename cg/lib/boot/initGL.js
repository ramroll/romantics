export const initGL = () => {
  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  if(!gl) {
    throw "gl initialize fail."
  }

  return gl
}