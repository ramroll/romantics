const Factor = require('./Factor')
const ASTNodeTypes = require('./ASTNodeTypes')

class Scalar extends Factor{
    constructor(token){
        super(token)
        this.type = ASTNodeTypes.SCALAR
    }
}

module.exports = Scalar