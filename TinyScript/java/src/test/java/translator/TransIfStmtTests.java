package translator;

import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import parser.Parser;
import parser.util.ParseException;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TransIfStmtTests {
    @Test
    public void testIfStmt() throws LexicalException, ParseException {

        var source = "if(a){" +
                "b = 1" +
                "}";
        var astNode = Parser.parse(source);
        var translator = new Translator();

        var program = translator.translate(astNode);
        System.out.println(program.toString());
        var expected = "IF a ELSE_GOTO L0\n" +
                "b = 1\n" +
                "L0:";
        assertEquals(expected, program.toString());

    }

    @Test
    public void testIfElseStmt() throws LexicalException, ParseException {

        var source = "if(a){\n" +
                "b = 1\n" +
                "} else {\n" +
                "b=2\n" +
                "}\n";
        var astNode = Parser.parse(source);
        var translator = new Translator();

        var program = translator.translate(astNode);
        var expected = "IF a ELSE_GOTO L0\n" +
                "b = 1\n" +
                "GOTO L1\n" +
                "L0:\n" +
                "b = 2\n" +
                "L1:";
        assertEquals(expected, program.toString());
    }

    @Test
    public void testIfElseIf() throws FileNotFoundException, ParseException, LexicalException, UnsupportedEncodingException {
        var astNode = Parser.fromFile("./example/complex-if.ts");
        var translator = new Translator();
        var program = translator.translate(astNode);
        System.out.println(program.toString());

    }
}
