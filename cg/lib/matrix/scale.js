export function scale2d(sx, sy) {
  return [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1
  ]
}

export function scale3d(sx, sy, sz) {
  return [
    sx, 0, 0, 0,
    0 , sy, 0, 0,
    0, 0, sz, 0, 
    0, 0, 0, 1
  ]
}