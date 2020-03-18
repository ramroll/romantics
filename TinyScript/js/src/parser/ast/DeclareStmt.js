const ASTNodeTypes = require('./ASTNodeTypes')
const {Stmt} = require('./index')
class DeclareStmt extends Stmt {
    constructor() {
        super(ASTNodeTypes.DECLARE_STMT, 'declare')
    }

}

module.exports = DeclareStmt 
const {Factor, Expr} = require('./index')

DeclareStmt.parse = (it) => {
    const stmt = new DeclareStmt()
    it.nextMatch("var")
    const tkn = it.peek()
    const factor = Factor.parse(it)
    if(factor == null) {
        throw ParseException.fromToken(tkn)
    }
    stmt.addChild(factor)
    const lexeme = it.nextMatch("=")
    const expr = Expr.parse(it)
    stmt.addChild(expr)
    stmt.setLexeme(lexeme)
    return stmt
}