import { identity3d } from "./identity";

export function rotate2d(deg) {
  return [
    Math.cos(deg), Math.sin(deg), 0,
    -Math.sin(deg), Math.cos(deg), 0,
    0, 0, 1
  ]
}

export function rotateY(angle) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  // c, 0, -s, 0
  // 0, 1, 0 , 0
  // s, 0, c, 0
  // 0, 0, 0, 1
  return [
    c, 0, s, 0,
    0, 1, 0, 0,
    -s, 0, c, 0,
    0, 0, 0, 1
  ]
}

export function rotateZ(angle) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
}