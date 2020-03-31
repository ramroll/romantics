const Expr = require('./Expr')
const ASTNodeTypes = require("./ASTNodeTypes")
class CallExpr extends Expr {
    constructor() {
        super()
        this.type = ASTNodeTypes.CALL_EXPR
        this.label = "call"
    }

}

module.exports = CallExpr 

CallExpr.parse = (factor, it) => {
    const expr = new CallExpr()
    expr.addChild(factor)

    it.nextMatch("(")
    let p = null
    while((p = Expr.parse(it)) != null) {
        expr.addChild(p)
        if(!it.peek().getValue() === ")") {
            it.nextMatch(",")
        }
    }
    it.nextMatch(")")
    return expr
}
