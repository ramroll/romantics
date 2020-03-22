const ASTNodeTypes = require('./ASTNodeTypes')
class Program {
    constructor(){
        super()
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