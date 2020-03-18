package parser.ast;

import parser.util.ParseException;
import parser.util.PeekTokenIterator;

public class Program extends Block {
    public Program() {
        super();
    }

    public static ASTNode parse(PeekTokenIterator it) throws ParseException {
        var block = new Program();
        ASTNode stmt = null;
        while( (stmt = Stmt.parseStmt(it)) != null) {
            block.addChild(stmt);
        }
        return block;

    }
}
