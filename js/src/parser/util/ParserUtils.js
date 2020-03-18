const Factor = require('../ast/Factor')
const ASTNodeTypes = require('../ast/ASTNodeTypes')
class ParserUtils {

    
    // postfix :后缀 
    // prefix : 前缀
    // 1 2 3 + + 
    static toPostfixExpression(node) {

        if(node instanceof Factor) {
            return node.getLexeme().getValue()
        }

        const prts = []
        for(const child of node.getChildren()) {
            prts.push(ParserUtils.toPostfixExpression(child));
        }
        var lexemeStr = node.getLexeme() != null ? node.getLexeme().getValue() : "";
        if(lexemeStr.length > 0) {
            return prts.join(" ") + " " + lexemeStr
        } else {
            return prts.join(" ")
        }
    }
}

module.exports = ParserUtils