class LexicalException extends Error {
  constructor(msg) {
    super(msg)
  }
  static fromChar(c: string) {
    return new LexicalException(`Unexpected char ${c}`)
  }
}

export default LexicalException