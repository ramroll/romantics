const ASTNodeTypes = require('./ASTNodeTypes')
const {Factor} = require('./index')

class Variable extends Factor{
    constructor(token){
        super(token)
        this.type = ASTNodeTypes.VARIABLE
    }

}

module.exports = Variable