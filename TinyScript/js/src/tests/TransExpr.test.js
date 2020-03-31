const Translator = require('../translator/Translator')
const SymbolTable = require('../translator/symbol/SymbolTable')
const TAProgram = require('../translator/TAProgram')
const Parser = require('../parser/Parser')
const {assert} = require('chai')

describe("translate-expr", () => {
  it("transExpr", () => {
    const source = "a+(b-c)+d*(b-c)*2"
    const p = Parser.parse(source)
    const exprNode = p.getChild(0)


    const translator = new Translator()
    var symbolTable = new SymbolTable()
    var program = new TAProgram()
    translator.translateExpr(program, exprNode, symbolTable)

    const expected = `p0 = b - c
p1 = b - c
p2 = p1 * 2
p3 = d * p2
p4 = p0 + p3
p5 = a + p4`

    assert.equal(program.toString(), expected)

  })


  it("testAssignStmt", () => {
    const source = "a=1.0*2.0*3.0"
    const astNode = Parser.parse(source)

    const translator = new Translator()
    const program = translator.translate(astNode)
    const code = program.toString()

    const expected = "p0 = 2.0 * 3.0\n" +
            "p1 = 1.0 * p0\n" +
            "a = p1"
    assert.equal(code, expected)
  })
})