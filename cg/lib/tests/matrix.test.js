import {matrix} from '../index'
import {assert} from 'chai'

describe("matrix", () => {

  it("multiply-case01", () => {
    const a = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]

    const b = [1,2,3]
    const c = matrix.multiply(b, a, 1, 3)
    assert.deepEqual(c, [1,2,3])
  })

  it("multiplay-case02", () => {
    const a = [
      1, 0, 2,
      0, 1, 4,
      0, 0, 1
    ]

    const b = [1,2,3]
    assert.deepEqual(matrix.multiply(b, a, 1, 3), [1,2,13])
  })

  it('multiply-case03', () => {
    const a = [3]
    const b = [5]
    assert.deepEqual(matrix.multiply(a, b, 1, 1), [15])
  })

  it("multiply-case04", () => {
    const a = [
      1,2,3
    ]
    const b = [
      1,
      2,
      3
    ]

    assert.deepEqual(matrix.multiply(a, b, 1, 3), [14])
    assert.deepEqual(matrix.multiply(b, a, 3, 1), [
      1, 2, 3,
      2 ,4, 6,
      3, 6, 9
    ])

  })
})