// @ts-ignore
import LinkedList = require('linkedlist')
const CACHE_SIZE = 10

interface IPeekIterator<T> {
  it: Generator<T>
  endToken: T
  stackPutBacks: LinkedList<T>
  queueCache: LinkedList<T>

  peek(): T
  putBack(): void
  next(): T
  hasNext(): boolean
}
/**
 * 流处理
 */
class PeekIterator<T=string> implements IPeekIterator<T> {
  it: Generator<T, any, unknown>
  endToken: T
  stackPutBacks: LinkedList<T>
  queueCache: LinkedList<T>
  constructor(it: Generator<T>, endToken=null) {
    this.it = it
    this.endToken = endToken
    // 从流中吃掉，但不丢弃的元素
    this.stackPutBacks = new LinkedList<T>()
    // 基于时间窗口的缓存
    this.queueCache = new LinkedList<T>()
  }
  peek(): T {
    if (this.stackPutBacks.length > 0) {
      return this.stackPutBacks.tail
    }
    const val = this.next()
    this.putBack()
    return val
  }
  putBack(): void {
    if (this.queueCache.length > 0) {
      this.stackPutBacks.push(this.queueCache.pop())
    }
  }
  next(): T {
    let val = null
    if (this.stackPutBacks.length > 0) {
      val = this.stackPutBacks.pop()
    } else {
      const current = this.it.next()
      val = current.value
      if (current.done) {
        [val, this.endToken] = [this.endToken, null]
      }
    }

    while (this.queueCache.length >= CACHE_SIZE) {
      this.queueCache.shift()
    }
    this.queueCache.push(val)
    return val
  }
  hasNext(): boolean {
    return !!this.endToken || !!this.peek()
  }
}

export default PeekIterator
