package translator;

import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import parser.Parser;
import parser.util.ParseException;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TransFunctionTests {

    @Test
    public void testSimpleFunction() throws FileNotFoundException, ParseException, LexicalException, UnsupportedEncodingException {
        var astNode = Parser.fromFile("./example/function.ts");
        var translator = new Translator();
        var program = translator.translate(astNode);
        var expect = "L0:\n" +
                "p0 = a + b\n" +
                "RETURN p0";
        assertEquals(expect, program.toString());

    }

    @Test
    public void testRecursiveFunction() throws FileNotFoundException, ParseException, LexicalException, UnsupportedEncodingException {
        var astNode = Parser.fromFile("./example/recursion.ts");
        var translator = new Translator();
        var program = translator.translate(astNode);
        System.out.println(program.toString());

        var expect = "L0:\n" +
                "p0 = n == 0\n" +
                "IF p0 ELSE L1\n" +
                "SP -2\n" +
                "RETURN 1\n" +
                "SP 2\n" +
                "L1:\n" +
                "p3 = n - 1\n" +
                "PARAM p3 0\n" +
                "SP -5\n" +
                "CALL L0\n" +
                "SP 5\n" +
                "p4 = p1 * n\n" +
                "RETURN p4";

        assertEquals(expect, program.toString());

    }
}
