const ASTNode = require('./ASTNode')

class Stmt extends ASTNode {
    constructor(type, label) {
        super(type, label)
    }
}

module.exports = Stmt

const {AssignStmt, DeclareStmt, FunctionDeclareStmt, ReturnStmt, IfStmt, Expr} = require('./index')
Stmt.parseStmt = (it) => {
    if(!it.hasNext()) {
        return null;
    }
    const token = it.next();
    const lookahead = it.peek();
    it.putBack();

    if(token.isVariable() && lookahead.getValue() === "=") {
        return AssignStmt.parse(it);
    } else if(token.getValue() === "const") {
        return DeclareStmt.parse(it);
    } else if(token.getValue() === "func") {
        return FunctionDeclareStmt.parse( it);
    } else if(token.getValue() === "return") {
        return ReturnStmt.parse(it);
    } else if(token.getValue() === "if") {
        return IfStmt.parse(it);
    } else {
        return Expr.parse(it);
    }

}
