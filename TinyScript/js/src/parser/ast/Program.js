const ASTNodeTypes = require('./ASTNodeTypes')
const ASTNode = require('./ASTNode')
class Program extends ASTNode{
    constructor(){
        super(ASTNodeTypes.PROGRAM, "program")
    }
}

module.exports = Program

const {Stmt} = require('./index')
Program.parse = (it) => {
    const program = new Program()
    let stmt = null
    while( (stmt = Stmt.parse(it)) != null) {
        program.addChild(stmt)
    }
    return program
}