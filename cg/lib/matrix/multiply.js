import {identity3d, identity4d, identity2d} from './identity'
/**
 * m*n 和 p*q的两个矩阵相乘
 * 复杂度：O(m*n*q) n == p
 * 可优化(分治策略)
 * @param {*} a 
 * @param {*} b 
 * @param {*} m 
 * @param {*} n 
 */
export function multiply(a, b, m, p) {
  const n = a.length / m
  const q = b.length / p

  if(n !== p) {
    throw "cannot apply multiplication:matrix shape not match"
  }
  const r = [m * q]
  for (let j = 0; j < q; j++) {
    for (let i = 0; i < m; i++) {
      let s = 0
      for(let k = 0; k < n; k++) {
        s += a[k + i*n] * b[j + k*q]
      }
      r[i * q + j] = s
    }
  }
  return r
} 


export function multiply3d(...matrixes) {
  return matrixes.reduce((a, b) => multiply(a, b, 3, 3), identity3d())
}

export function multiply4d(...matrixes) {
  return matrixes.reduce((a, b) => multiply(a, b, 4, 4), identity4d())
}

export function multiplynd(...matrixes) {
  const n = Math.sqrt(matrixes[0].length)
  let i = null
  if(n == 2) {
    i = identity2d()
  } else if(n === 3) {
    i = identity3d()
  } else if(n === 4) {
    i = identity4d()
  } else {
    throw "not support."
  }
  return matrixes.reduce((a, b) => multiply(a, b, n, n), i)
}