package translator;

import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import parser.Parser;
import parser.util.ParseException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BlockTest {

    @Test
    public void test() throws LexicalException, ParseException {

        var source = "var a = 1\n" +
                "{\n" +
                "var b = a * 100\n" +
                "}\n" +
                "{\n" +
                "var b = a * 100\n" +
                "}\n";

        var ast = Parser.parse(source);

        var translator = new Translator();

        var program = translator.translate(ast);


        assertEquals("a = 1\n" +
                "p1 = a * 100\n" +
                "b = p1\n" +
                "p1 = a * 100\n" +
                "b = p1", program.toString());



    }




}
