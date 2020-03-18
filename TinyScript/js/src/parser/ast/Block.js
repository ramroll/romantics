const ASTNodeTypes = require('./ASTNodeTypes')
const {Stmt} = require('./index')
class Block extends Stmt {
    constructor() {
        super(ASTNodeTypes.BLOCK, 'block')
    }

    static parse(it) {
        it.nextMatch("{")
        const block = new Block()
        const stmt = null

        while( (stmt = Stmt.parseStmt(it)) != null) {
            block.addChild(stmt);
        }
        it.nextMatch("}")
        return block
    }
}


module.exports = Block 