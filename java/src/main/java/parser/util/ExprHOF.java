package parser.util;

import parser.ast.ASTNode;

// HOF: High order function
@FunctionalInterface
public interface ExprHOF {

    ASTNode hoc() throws ParseException;

}
