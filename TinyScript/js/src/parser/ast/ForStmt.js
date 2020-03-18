const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')
class ForStmt extends Stmt {
    constructor() {
        super(ASTNodeTypes.FOR_STMT, 'for')
    }
}


module.exports = ForStmt 