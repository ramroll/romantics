package parser.ast;

import lexer.TokenType;
import org.apache.commons.lang3.NotImplementedException;
import parser.util.ParseException;
import parser.util.PeekTokenIterator;

/**
 * 语句
 */
public abstract class Stmt extends ASTNode{
    public Stmt(ASTNodeTypes _type, String _label) {
        super( _type, _label);
    }

    public static ASTNode parseStmt(PeekTokenIterator it) throws ParseException {
        if(!it.hasNext()) {
            return null;
        }
        var token = it.next();
        var lookahead = it.peek();
        it.putBack();

        if(token.isVariable() && lookahead != null && lookahead.getValue().equals("=")) {
            return AssignStmt.parse(it);
        } else if(token.getValue().equals("var")) {
            return DeclareStmt.parse(it);
        } else if(token.getValue().equals("func")) {
            return FunctionDeclareStmt.parse( it);
        } else if(token.getValue().equals("return")) {
            return ReturnStmt.parse(it);
        } else if(token.getValue().equals("if")) {
            return IfStmt.parse(it);
        } else if(token.getValue().equals("{")) {
            return Block.parse(it);
        }else {
            return Expr.parse(it);
        }

    }


}
