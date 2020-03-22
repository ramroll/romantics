const ASTNode = require('./ASTNode')
const ASTNodeTypes = require('./ASTNodeTypes')

class FunctionArgs extends ASTNode {

    constructor(){
        super(ASTNodeTypes.FUNCTION_ARGS, "args")
    }
}

module.exports = FunctionArgs

const {Factor} = require('./index')

FunctionArgs.parse = it => {
    // int a, int b, string c

    const args = new FunctionArgs()

    while(it.peek().isType()) {
        const type = it.next()
        const variable = Factor.parse(it)
        args.addChild(variable)
        variable.setTypeLexeme(type)

        if(it.peek().getValue() !== ')') {
            it.nextMatch(',')
        }
    }
    return args

}