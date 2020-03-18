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

    if(token.isconstiable() && lookahead.getValue().equals("=")) {
        return AssignStmt.parse(it);
    } else if(token.getValue().equals("const")) {
        return DeclareStmt.parse(it);
    } else if(token.getValue().equals("func")) {
        return FunctionDeclareStmt.parse( it);
    } else if(token.getValue().equals("return")) {
        return ReturnStmt.parse(it);
    } else if(token.getValue().equals("if")) {
        return IfStmt.parse(it);
    } else {
        return Expr.parse(it);
    }

}
