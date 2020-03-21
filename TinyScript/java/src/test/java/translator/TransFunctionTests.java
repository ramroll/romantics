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
        System.out.println(program);

    }
}
