function* arrayToGenerator<T=string>(arr: Array<T>): Generator<T> {
  for (let item of arr) {
    yield item
  }
}

export default arrayToGenerator