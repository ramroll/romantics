package parser;

import common.PeekIterator;
import lexer.Lexer;
import lexer.LexicalException;
import parser.ast.ASTNode;
import parser.ast.Program;
import parser.util.ParseException;
import parser.util.PeekTokenIterator;

public class Parser {

    public static ASTNode parse(String source) throws LexicalException, ParseException {
        var lexer = new Lexer();
        var tokens = lexer.analyse(new PeekIterator<>(source.chars().mapToObj(x ->(char)x), '\0'));
        return Program.parse(new PeekTokenIterator(tokens.stream()));
    }

}
