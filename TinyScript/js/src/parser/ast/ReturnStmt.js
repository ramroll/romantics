const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')
class ReturnStmt extends Stmt {
    constructor(){
        super(ASTNodeTypes.RETURN_STMT, "return")
    }
}

module.exports = ReturnStmt

const {Expr} = require('./index')
ReturnStmt.parse = (it) => {
    const lexeme = it.nextMatch("return")
    const expr = Expr.parse(it)
    const stmt = new ReturnStmt()
    stmt.setLexeme(lexeme)
    stmt.addChild(expr)
    return stmt;
}