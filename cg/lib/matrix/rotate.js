export function rotate2d(deg) {
  return [
    Math.cos(deg), Math.sin(deg), 0,
    -Math.sin(deg), Math.cos(deg), 0,
    0, 0, 1
  ]
}