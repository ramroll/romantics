package parser;

import common.PeekIterator;
import lexer.Lexer;
import lexer.LexicalException;
import parser.ast.ASTNode;
import parser.ast.Program;
import parser.util.ParseException;
import parser.util.PeekTokenIterator;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;

public class Parser {

    public static ASTNode parse(String source) throws LexicalException, ParseException {
        var lexer = new Lexer();
        var tokens = lexer.analyse(new PeekIterator<>(source.chars().mapToObj(x ->(char)x), '\0'));
        return Program.parse(new PeekTokenIterator(tokens.stream()));
    }

    public static ASTNode fromFile(String file) throws FileNotFoundException, UnsupportedEncodingException, LexicalException, ParseException {
        var tokens = Lexer.fromFile(file);
        return Program.parse(new PeekTokenIterator(tokens.stream()));
    }
}
