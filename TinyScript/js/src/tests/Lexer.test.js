const Token = require('../lexer/Token')
const Lexer = require('../lexer/Lexer')
const TokenType = require('../lexer/TokenType')
const arrayToGenerator = require('../common/arrayToGenerator')
const {assert} = require('chai')

function assertToken(token, value, type) {
    assert.equal(token.getValue(), value)
    assert.equal(token.getType(), type)
}

describe("Lexer", () => {

    it('expression', () => {
        const source = '(a+b)^100.12==+100-20'
        const lexer = new Lexer()
        const tokens = lexer.analyse(arrayToGenerator([...source]))
        assert.equal(tokens.length, 11)

        assertToken(tokens[0], '(', TokenType.BRACKET)
        assertToken(tokens[1], "a", TokenType.VARIABLE);
        assertToken(tokens[2], "+", TokenType.OPERATOR);
        assertToken(tokens[3], "b", TokenType.VARIABLE);
        assertToken(tokens[4], ")", TokenType.BRACKET);
        assertToken(tokens[5], "^", TokenType.OPERATOR);
        assertToken(tokens[6], "100.12", TokenType.FLOAT);
        assertToken(tokens[7], "==", TokenType.OPERATOR);
        assertToken(tokens[8], "+100", TokenType.INTEGER);
        assertToken(tokens[9], "-", TokenType.OPERATOR);
        assertToken(tokens[10], "20", TokenType.INTEGER);
        
    })

    it("func", () => {
        const source = `
            func foo(a,b) {
                print(a+b)
            }
            foo(-100.0, 100)
        ` 
        const lexer = new Lexer()
        const tokens = lexer.analyse(arrayToGenerator([...source]))
        assertToken(tokens[0], "func", TokenType.KEYWORD);
        assertToken(tokens[1], "foo", TokenType.VARIABLE);
        assertToken(tokens[2], "(", TokenType.BRACKET);
        assertToken(tokens[3], "a", TokenType.VARIABLE);
        assertToken(tokens[4], ",", TokenType.OPERATOR);
        assertToken(tokens[5], "b", TokenType.VARIABLE);
        assertToken(tokens[6], ")", TokenType.BRACKET);
        assertToken(tokens[7], "{", TokenType.BRACKET);
        assertToken(tokens[8], "print", TokenType.VARIABLE);
        assertToken(tokens[9], "(", TokenType.BRACKET);
        assertToken(tokens[10], "a", TokenType.VARIABLE);
        assertToken(tokens[11], "+", TokenType.OPERATOR);
        assertToken(tokens[12], "b", TokenType.VARIABLE);
        assertToken(tokens[13], ")", TokenType.BRACKET);
        assertToken(tokens[14], "}", TokenType.BRACKET);
        assertToken(tokens[15], "foo", TokenType.VARIABLE);
        assertToken(tokens[16], "(", TokenType.BRACKET);
        assertToken(tokens[17], "-100.0", TokenType.FLOAT);
        assertToken(tokens[18], ",", TokenType.OPERATOR);
        assertToken(tokens[19], "100", TokenType.INTEGER);
        assertToken(tokens[20], ")", TokenType.BRACKET);

    })

    it("delete comment", () =>{
        const lexer = new Lexer()
        const source = "/*123123123\n123123123*/a=1"
        const tokens = lexer.analyse(arrayToGenerator([...source]))
        assert.equal(tokens.length, 3)
    })

    it("delete one line comment", () => {
        const lexer = new Lexer()
        const source = "//adnwjdbakd\na=1"
        const tokens = lexer.analyse(arrayToGenerator([...source]))
        assert.equal(tokens.length, 3)
    })
})