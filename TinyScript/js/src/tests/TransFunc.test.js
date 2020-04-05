const Translator = require('../translator/Translator')
const SymbolTable = require('../translator/symbol/SymbolTable')
const TAProgram = require('../translator/TAProgram')
const Parser = require('../parser/Parser')
const path = require('path')
const {assert} = require('chai')

describe("translate-func", () => {
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

    const expect =  `L0:
p0 = n == 0
IF p0 ELSE L1
SP -2
RETURN 1
SP 2
L1:
p3 = n - 1
PARAM p3 0
SP -5
CALL L0
SP 5
p4 = p1 * n
RETURN p4`;

      console.log(program.toString())
    assert.equal(program.toString(), expect)
  })

})