const SymbolTable = require('../translator/symbol/SymbolTable')
const Token = require("../lexer/Token")
const TokenType = require('../lexer/TokenType')
const {assert} = require("chai")


describe("SymbolTable", () => {

  it("basic", () => {
    const symbolTable = new SymbolTable()
    symbolTable.createLabel("L0", new Token(TokenType.VARIABLE, "foo"))
    symbolTable.createVariable()
    symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "foo"))
    assert.equal(symbolTable.localSize(), 1)
  })

  it("chain", () => {

      const symbolTable = new SymbolTable()
      symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "a"))

      const childTable = new SymbolTable()
      symbolTable.addChild(childTable)

      const childChildTable = new SymbolTable()
      childTable.addChild(childChildTable)
      assert.equal(childChildTable.exists(new Token(TokenType.VARIABLE, "a")), true)
      assert.equal(childTable.exists(new Token(TokenType.VARIABLE, "a")), true)

  })

  it("offset", () => {
    
    const symbolTable = new SymbolTable()


    symbolTable.createSymbolByLexeme(new Token(TokenType.INTEGER, "100"))
    const symbolA = symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "a"))
    const symbolB = symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "b"))


    const childTable = new SymbolTable()
    symbolTable.addChild(childTable)
    const anotherSymbolB = childTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "b"))
    var symbolC = childTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "c"))

    assert.equal(symbolA.getOffset(), 0)
    assert.equal(symbolB.getOffset(), 1)
    assert.equal(anotherSymbolB.getOffset(), 1)
    assert.equal(anotherSymbolB.getLayerOffset(), 1)
    assert.equal(symbolC.getOffset(), 0)
    assert.equal(symbolC.getLayerOffset(), 0)
  })

})
