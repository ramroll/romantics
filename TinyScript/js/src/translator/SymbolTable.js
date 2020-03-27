class SymbolTable {
  constructor(){
    this.parent = null
    this.children = []
    this.symbols = []
    this.tempIndex = 0
  }

  addSymbol(symbol){
    this.symbols.push(symbol)
    symbol.setParent(this)
    symbol.setOffset(this.symbols.length - 1)
  }

  addChild(child){
    child.parent = this
    this.children.push(child)
  }

  getSymbol(i) {
    return this.symbols[i] || null
  }

  size(){
    return this.symbols.length
  }

  findSymbolByLexeme(lexeme){
    const symbol = this.symbols.find(x => x.getLexemeValue() == lexeme.getValue())
    if(symbol) {return symbol}
    if(!this.parent) {
      return null
    }
    return this.parent.findSymbolByLexeme(lexeme)
  }

  createSymbolByLexeme(lexeme){
    let symbol = null
    if(lexeme.isScalar()) {
      symbol = new Symbol()
    } else {
      symbol = this.findSymbolByLexeme(lexeme)
    }

  }

}

module.exports = SymbolTable