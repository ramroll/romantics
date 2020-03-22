const ASTNodeTypes = require('./ASTNodeTypes')
const TokenType = require('../../lexer/TokenType')
const ParseException = require('../util/ParseException')
const {Stmt} = require('./index')

// func v(args...) int Block
class FunctionDeclareStmt extends Stmt {
    constructor() {
        super(ASTNodeTypes.FUNCTION_DECLARE_STMT, 'func')
    }

    getArgs(){
        return this.getChild(1)
    }

    getFunctionVariable() {
        return this.getChild(0)
    }

    getFuncType(){
        return this.getFunctionVariable().getTypeLexeme().getValue()
    }

    getBlock(){
        return this.getChild(2)
    }
}

module.exports = FunctionDeclareStmt 


const {Factor, FunctionArgs, Block} = require('./index')
FunctionDeclareStmt.parse = it => {
    it.nextMatch('func')

    // func add() int {}
    const func = new FunctionDeclareStmt()

    const functionVariable = Factor.parse(it)
    func.setLexeme(functionVariable.getLexeme())
    func.addChild(functionVariable)
    it.nextMatch('(')
    const args = FunctionArgs.parse(it)
    func.addChild(args)
    it.nextMatch(')')

    const keyword = it.nextMatch1(TokenType.KEYWORD)
    if(!keyword.isType()) {
        throw ParseException.fromToken(keyword)
    }

    functionVariable.setTypeLexeme(keyword)
    const block = Block.parse(it)
    func.addChild(block)
    return func


}