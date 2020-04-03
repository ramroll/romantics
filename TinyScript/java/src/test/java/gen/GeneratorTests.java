package gen;

import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import parser.Parser;
import parser.util.ParseException;
import translator.Translator;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GeneratorTests {

    @Test
    public void exprEvaluate() throws LexicalException, ParseException {

        var source = "var a = 3*2*(5+1)";
        var astNode = Parser.parse(source);
        var translator = new Translator();
        var taProgram = translator.translate(astNode);

        assertEquals("0:3\n" +
                        "1:2\n" +
                        "2:5\n" +
                        "3:1", taProgram.getStaticSymbolTable().toString());
        var generator = new OpCodeGen();
        var program = generator.gen(taProgram);
        assertEquals("LW S0 STATIC 2\n" +
                "LW S1 STATIC 3\n" +
                "ADD S1 S0 S1\n" +
                "SW S1 SP 1\n" +
                "LW S0 STATIC 1\n" +
                "LW S1 SP 1\n" +
                "MULT S0 S1\n" +
                "MFLO S1\n" +
                "SW S1 SP 2\n" +
                "LW S0 STATIC 0\n" +
                "LW S1 SP 2\n" +
                "MULT S0 S1\n" +
                "MFLO S1\n" +
                "SW S1 SP 3\n" +
                "LW S0 SP 3\n" +
                "SW S0 SP 0", program.toString());
    }

    @Test
    public void funcEvaluate() throws FileNotFoundException, ParseException, LexicalException, UnsupportedEncodingException {
        var astNode = Parser.fromFile("./example/recursion.ts");
        var translator = new Translator();
        var taProgram = translator.translate(astNode);
        var gen = new OpCodeGen();
        var program = gen.gen(taProgram);
    }

}
