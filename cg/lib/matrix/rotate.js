import { identity3d } from "./identity";

export function rotate2d(a) {
  return [
    Math.cos(a), Math.sin(a), 0,
    -Math.sin(a), Math.cos(a), 0,
    0, 0, 1
  ]
}

export function rotateX(angle) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  // 1, 0, 0, 0
  // 0, c, -s , 0
  // 0, s, c, 0
  // 0, 0, 0, 1
  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ]
}

export function rotateY(angle) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  // c, 0, s, 0
  // 0, 1, 0 , 0
  // -s, 0, c, 0
  // 0, 0, 0, 1
  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
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
