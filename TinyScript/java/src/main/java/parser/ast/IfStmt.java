package parser.ast;

import parser.util.ParseException;
import parser.util.PeekTokenIterator;

public class IfStmt extends Stmt {
    public IfStmt() {
        super(ASTNodeTypes.IF_STMT, "if");
    }

    public static ASTNode parse(PeekTokenIterator it) throws ParseException {
        return parseIF( it);
    }

    // IfStmt -> If(Expr) Block Tail
    public static ASTNode parseIF(PeekTokenIterator it) throws ParseException {
        var lexeme = it.nextMatch("if");
        it.nextMatch("(");
        var ifStmt = new IfStmt();
        ifStmt.setLexeme(lexeme);
        var expr = Expr.parse( it);
        ifStmt.addChild(expr);
        it.nextMatch(")");
        var block = Block.parse( it);
        ifStmt.addChild(block);

        var tail = parseTail(it);
        if(tail != null) {
            ifStmt.addChild(tail);
        }
        return ifStmt;

    }

    // Tail -> else {Block} | else IFStmt | ε
    public static ASTNode parseTail(PeekTokenIterator it) throws ParseException {
        if(!it.hasNext() || !it.peek().getValue().equals("else")) {
            return null;
        }
        it.nextMatch("else");
        var lookahead = it.peek();

        if(lookahead.getValue().equals("{")) {
            return Block.parse(it);
        } else if(lookahead.getValue().equals("if")){
            return parseIF(it);
        } else {
            return null;
        }

    }

    public ASTNode getExpr() {
        return this.getChild(0);
    }

    public ASTNode getBlock(){
        return this.getChild(1);
    }

    public ASTNode getElseBlock(){

        var block = this.getChild(2);
        if(block instanceof Block) {
            return block;
        }
        return null;
    }

    public ASTNode getElseIfStmt(){
        var ifStmt = this.getChild(2);
        if(ifStmt instanceof IfStmt) {
            return ifStmt;
        }
        return null;
    }


}
