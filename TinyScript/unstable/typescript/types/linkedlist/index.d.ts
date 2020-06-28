declare module 'linkedlist' {
  class Linkedlist<T> {
    push(data: T): void
    pop(): T
    unshift(data: T): void
    shift(): T
    next(): T
    
    length: number
    head: T
    tail: T
    current: T
  }
  export=Linkedlist
}
