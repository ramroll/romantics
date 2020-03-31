const Translator = require('../translator/Translator')
const SymbolTable = require('../translator/symbol/SymbolTable')
const TAProgram = require('../translator/TAProgram')
const Parser = require('../parser/Parser')
const path = require('path')
const {assert} = require('chai')

describe("translate-if", () => {
  it("simple", () => {
    const astNode = Parser.fromFile(path.resolve(__dirname, "../../example/function.ts"))
    const translator = new Translator()
    const program = translator.translate(astNode)
    const expect = "L0:\n" +
            "p0 = a + b\n" +
            "RETURN p0";
    assert.equal(program.toString(), expect)
  })


  it("recursive", () => {
    const astNode = Parser.fromFile(path.resolve(__dirname, "../../example/recursion.ts"))
    const translator = new Translator()
    const program = translator.translate(astNode)

    const expect = "L0:\n" +
      "p0 = n == 0\n" +
      "IF p0 ELSE L1\n" +
      "SP -2\n" +
      "RETURN 1\n" +
      "SP 2\n" +
      "L1:\n" +
      "PARAM fact 0\n" +
      "p3 = n - 1\n" +
      "PARAM p3 1\n" +
      "CALL L0\n" +
      "p4 = p1 * n\n" +
      "RETURN p4"

    assert.equal(program.toString(), expect)
  })

})