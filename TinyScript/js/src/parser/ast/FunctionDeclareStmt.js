const ASTNodeTypes = require('./ASTNodeTypes')
const {Stmt} = require('./index')
class FunctionDeclareStmt extends Stmt {
    constructor() {
        super(ASTNodeTypes.FUNCTION_DECLARE_STMT, 'func')
    }
}


module.exports = FunctionDeclareStmt 