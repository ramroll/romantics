const Translator = require('../translator/Translator')
const SymbolTable = require('../translator/symbol/SymbolTable')
const TAProgram = require('../translator/TAProgram')
const Parser = require('../parser/Parser')
const path = require('path')
const {assert} = require('chai')

describe("translate-if", () => {
  it("if", () => {
    const source = "if(a){" +
      "b = 1" +
    "}";
    const astNode = Parser.parse(source)
    const translator = new Translator()

    const program = translator.translate(astNode)
    console.log(program.toString())
    const expected = `IF a ELSE L0
SP -1
b = 1
SP 1
L0:`
    assert.equal(program.toString(), expected)
  })


  it("testIfElseStmt", () => {
    const source = "if(a){\n" +
      "b = 1\n" +
      "} else {\n" +
      "b=2\n" +
      "}\n"
    const astNode = Parser.parse(source)
    const translator = new Translator()

    const program = translator.translate(astNode);
    const expected = "IF a ELSE L0\n" +
    "SP -1\n" +
    "b = 1\n" +
    "SP 1\n" +
    "GOTO L1\n" +
    "L0:\n" +
    "SP -1\n" +
    "b = 2\n" +
    "SP 1\n" +
    "L1:";
    assert.equal(program.toString(), expected)
  })

  it("testIfElseIf", () => {
    const astNode = Parser.fromFile(path.resolve(__dirname, "../../example/complex-if.ts"))
    const translator = new Translator()
    const program = translator.translate(astNode)
    const expected = "p0 = a == 1\n" +
            "IF p0 ELSE L0\n" +
            "SP -2\n" +
            "b = 100\n" +
            "SP 2\n" +
            "GOTO L5\n" +
            "L0:\n" +
            "p1 = a == 2\n" +
            "IF p1 ELSE L1\n" +
            "SP -3\n" +
            "b = 500\n" +
            "SP 3\n" +
            "GOTO L4\n" +
            "L1:\n" +
            "p2 = a == 3\n" +
            "IF p2 ELSE L2\n" +
            "SP -4\n" +
            "p1 = a * 1000\n" +
            "b = p1\n" +
            "SP 4\n" +
            "GOTO L3\n" +
            "L2:\n" +
            "SP -4\n" +
            "b = -1\n" +
            "SP 4\n" +
            "L3:\n" +
            "L4:\n" +
            "L5:";

    assert.equal(program.toString(), expected)
  })

})