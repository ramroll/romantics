const Translator = require('../translator/Translator')
const SymbolTable = require('../translator/symbol/SymbolTable')
const TAProgram = require('../translator/TAProgram')
const Parser = require('../parser/Parser')
const {assert} = require('chai')


describe("translate-block", () => {

  it('basic', () => {
    const source = `
    var a = 1
    {
      var b = a * 100
    }
    {
      var b = a * 100
    }`

    const ast = Parser.parse(source)
    const translator = new Translator()
    const program = translator.translate(ast)

    const expected = `a = 1
SP -1
p1 = a * 100
b = p1
SP 1
SP -1
p1 = a * 100
b = p1
SP 1`
    assert.equal(program.toString() , expected)
  })

})