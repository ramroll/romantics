const Expr = require("./ast/Expr")
const Scalar = require('./ast/Scalar')
const ASTNodeTypes = require('./ast/ASTNodeTypes')

class SimpleParser {

    // Expr -> digit + Expr | digit
    // digit -> 0|1|2|3|...|9
    static parse(it) {
        const expr = new Expr(null)
        const scalar = new Scalar(it)
        if(!it.hasNext()) {
            return scalar
        }

        expr.addChild(scalar)
        const op = it.nextMatch("+")
        expr.label = "+"
        expr.type = ASTNodeTypes.BINARY_EXPR
        expr.lexeme = op
        expr.addChild(SimpleParser.parse(it))

        return expr
    }
}

module.exports = SimpleParser