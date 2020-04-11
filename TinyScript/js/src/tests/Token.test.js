const Token = require('../lexer/Token')
const TokenType = require('../lexer/TokenType')
const PeekIterator = require('../common/PeekIterator')
const arrayToGenerator = require('../common/arrayToGenerator')
const {assert} = require("chai")
describe("Token", () => {

    function assertToken(token, value, type) {
        assert.equal(token.getValue(), value)
        assert.equal(token.getType(), type)
    }

    it("varOrKeyword", () => {
        const it1 = new PeekIterator(arrayToGenerator([..."if abc"]))
        const it2 = new PeekIterator(arrayToGenerator([..."true abc"]))

        const token1 = Token.makeVarOrKeyword(it1)
        const token2 = Token.makeVarOrKeyword(it2)
        it1.next()
        const token3 = Token.makeVarOrKeyword(it1)
        assertToken(token1, "if", TokenType.KEYWORD)
        assertToken(token2, "true", TokenType.BOOLEAN)
        assertToken(token3, "abc", TokenType.VARIABLE)
    })

    it("makeString", () =>{
        const tests = ["'123'", '"123"']

        for(let test of tests) {
            const it = new PeekIterator(arrayToGenerator([...test]))
            const token = Token.makeString(it)
            assertToken(token, test, TokenType.STRING)
        }

    })

    it("makeOp", () => {
        const tests = [
            ["+ xxx", "+"],
            ["++mmm", "++"],
            ["/=g", "/="],
            ["==1", "=="],
            ["&=3982", "&="],
            ["&777", "&"],
            ["||xx", "||"],
            ["^=111", "^="],
            ["%7", "%"],
        ]

        for(let test of tests) {
            const [input, expected] = test
            const it = new PeekIterator(arrayToGenerator([...input]))
            const token = Token.makeOp(it)
            assertToken(token, expected, TokenType.OPERATOR)
        }
    })


    it("makeNumber", () => {
        const tests = [
            "+0 aa",
            "-0 bbb",
            ".3 ccc",
            ".5555 ddd",
            "7899.999 aaa",
            "-100 ggg",
            "-1000.5345345*123123",
            "012 aaa"
        ]

        for(let test of tests) {
            const it = new PeekIterator(arrayToGenerator([...test]))
            const token = Token.makeNumber(it)
            const [expected] = test.split(/[ *]/);
            const type = test.indexOf('.') == -1 ? TokenType.INTEGER : TokenType.FLOAT
            assertToken(token, expected, type)
        }


    })


})