package parser.ast;

import lexer.TokenType;
import parser.util.ParseException;
import parser.util.PeekTokenIterator;

public class AssignStmt extends Stmt {

    public AssignStmt() {
        super(ASTNodeTypes.ASSIGN_STMT, "assign");
    }
    public static ASTNode parse(PeekTokenIterator it) throws ParseException {
        var stmt = new AssignStmt();
        var tkn = it.peek();
        var factor = Factor.parse(it);
        if(factor == null) {
            throw new ParseException(tkn);
        }
        stmt.addChild(factor);
        var lexeme = it.nextMatch("=");
        var expr = Expr.parse(it);
        stmt.addChild(expr);
        stmt.setLexeme(lexeme);
        return stmt;

    }

}
