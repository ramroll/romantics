const ASTNode = require('./ASTNode')
const ASTNodeTypes = require('./ASTNodeTypes')

class FunctionArgs extends ASTNode {

    constructor(){
        super(ASTNodeTypes.FUNCTION_ARGS, "args")
    }
}

module.exports = FunctionArgs

const {Factor} = require('./index')
FunctionArgs.parse = (it) => {
    const args = new FunctionArgs()

    while(it.peek().isType()) {
        const type = it.next()
        const variable = Factor.parse(it)
        variable.setTypeLexeme(type)
        args.addChild(variable)

        if(it.peek().getValue() !== ")") {
            it.nextMatch(",")
        }
    }

    return args
}