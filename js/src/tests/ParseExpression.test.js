const Lexer = require('../lexer/Lexer')
const Expr = require('../parser/ast/Expr')
const PeekTokenIterator = require('../parser/util/PeekTokenIterator')
const arrayToGenerator = require("../common/arrayToGenerator")
const ParserUtils = require('../parser/util/ParserUtils')
const {assert} = require('chai')


function createExpr(str) {
    const gen = arrayToGenerator([...str])
    const lexer = new Lexer()
    const tokens = lexer.analyse(gen)
    const it = new PeekTokenIterator(arrayToGenerator(tokens))
    return Expr.parse(it)
}

describe("ParseExpression", () => {
    it("simple", () => {
        const expr = createExpr("1+1+1")
        assert.equal(ParserUtils.toPostfixExpression(expr), "1 1 1 + +")
    })

    it("simple1", () => {
        const expr = createExpr('"1" == ""')
        assert.equal(ParserUtils.toPostfixExpression(expr), '"1" "" ==')

    })

    it("complex", () => {
        const expr1 = createExpr("1+2*3")
        const expr2 = createExpr("1*2+3")
        const expr3 = createExpr("10 * (7+4)")
        const expr4 = createExpr("(1*2!=7)==3!=4*5+6")
        assert.equal(ParserUtils.toPostfixExpression(expr1), '1 2 3 * +')
        assert.equal(ParserUtils.toPostfixExpression(expr2), '1 2 * 3 +')
        assert.equal(ParserUtils.toPostfixExpression(expr3), '10 7 4 + *')
        assert.equal(ParserUtils.toPostfixExpression(expr4), '1 2 * 7 != 3 4 5 * 6 + != ==')


    })
})