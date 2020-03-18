package parser;

import parser.ast.*;
import parser.util.ParseException;
import parser.util.PeekTokenIterator;

public class SimpleParser {
    // Expr -> digit + Expr | digit
    // digit -> 0|1|2|3|4|5|...|9
    public static ASTNode parse(PeekTokenIterator it) throws ParseException {

        var expr = new Expr();
        var scalar = Factor.parse(it);
        // base condition
        if(!it.hasNext()){
           return scalar;
        }

        expr.setLexeme(it.peek());
        it.nextMatch("+");
        expr.setLabel("+");
        expr.addChild(scalar);
        expr.setType(ASTNodeTypes.BINARY_EXPR);
        var rightNode = parse(it);
        expr.addChild(rightNode);
        return expr;
    }
}
