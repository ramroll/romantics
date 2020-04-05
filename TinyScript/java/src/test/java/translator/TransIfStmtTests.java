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
        var expected = "IF a ELSE L0\n" +
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
        var expected = "IF a ELSE L0\n" +
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

        var expectd = "p0 = a == 1\n" +
                "IF p0 ELSE L0\n" +
                "b = 100\n" +
                "GOTO L5\n" +
                "L0:\n" +
                "p1 = a == 2\n" +
                "IF p1 ELSE L1\n" +
                "b = 500\n" +
                "GOTO L4\n" +
                "L1:\n" +
                "p2 = a == 3\n" +
                "IF p2 ELSE L2\n" +
                "p1 = a * 1000\n" +
                "b = p1\n" +
                "GOTO L3\n" +
                "L2:\n" +
                "b = -1\n" +
                "L3:\n" +
                "L4:\n" +
                "L5:";

        assertEquals(expectd, program.toString());
    }
}
