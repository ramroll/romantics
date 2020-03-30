const SymbolTable = require('../translator/symbol/SymbolTable')
const Token = require("../lexer/Token")
const {assert} = require("mocha")


describe("SymbolTable", () => {

  it("basic", () => {
    const symbolTable = new SymbolTable()
    symbolTable.createLabel("L0", new Token(TokenType.VARIABLE, "foo"))
    symbolTable.createVariable()
    symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, "foo"))
    assertEquals(1, symbolTable.localSize())
  })

})
