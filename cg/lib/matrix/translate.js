export function translate2d(x, y) {

  return [
    1, 0, 0,
    0, 1, 0,
    x, y, 1
  ]
}



export function translate3d(x,y,z) {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]
}