package parser.ast;

import parser.util.ParseException;
import parser.util.PeekTokenIterator;

public class Block extends Stmt {
    public Block() {
        super(ASTNodeTypes.BLOCK, "block");
    }

    public static ASTNode parse(PeekTokenIterator it) throws ParseException {
        it.nextMatch("{");
        var block = new Block();
        ASTNode stmt = null;
        while( (stmt = Stmt.parseStmt(it)) != null) {
            block.addChild(stmt);
        }
        it.nextMatch("}");
        return block;

    }




}
