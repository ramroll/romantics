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
        System.out.println(program);
        assertEquals("#p0 = 5 + 1\n" +
                "LW S0 STATIC 2\n" +
                "LW S1 STATIC 3\n" +
                "ADD S2 S0 S1\n" +
                "SW S2 SP -1\n" +
                "#p1 = 2 * p0\n" +
                "LW S0 STATIC 1\n" +
                "LW S1 SP -1\n" +
                "MULT S0 S1\n" +
                "MFLO S2\n" +
                "SW S2 SP -2\n" +
                "#p2 = 3 * p1\n" +
                "LW S0 STATIC 0\n" +
                "LW S1 SP -2\n" +
                "MULT S0 S1\n" +
                "MFLO S2\n" +
                "SW S2 SP -3\n" +
                "#a = p2\n" +
                "LW S0 SP -3\n" +
                "SW S0 SP 0", program.toString());
    }

    @Test
    public void funcEvaluate() throws FileNotFoundException, ParseException, LexicalException, UnsupportedEncodingException {
        var astNode = Parser.fromFile("./example/add.ts");
        var translator = new Translator();
        var taProgram = translator.translate(astNode);
        var gen = new OpCodeGen();
        var program = gen.gen(taProgram);
        System.out.println(program);
        var expected ="#FUNC_BEGIN\n" +
                "SW RA SP 0\n" +
                "#p1 = a + b\n" +
                "LW S0 SP -1\n" +
                "LW S1 SP -2\n" +
                "ADD S2 S0 S1\n" +
                "SW S2 SP -3\n" +
                "#RETURN p1\n" +
                "LW S0 SP -3\n" +
                "SW S0 SP 1\n" +
                "RETURN \n" +
                "#FUNC_BEGIN\n" +
                "MAIN:SW RA SP 0\n" +
                "#PARAM 10 3\n" +
                "LW S0 STATIC 0\n" +
                "SW S0 SP -3\n" +
                "#PARAM 20 4\n" +
                "LW S0 STATIC 1\n" +
                "SW S0 SP -4\n" +
                "#SP -2\n" +
                "SUBI SP 2\n" +
                "#CALL L0\n" +
                "JR L0\n" +
                "#SP 2\n" +
                "ADDI SP 2\n" +
                "#RETURN null\n" +
                "SW S0 SP 1\n" +
                "RETURN \n" +
                "#SP -1\n" +
                "SUBI SP 1\n" +
                "#CALL L1\n" +
                "JR L1\n" +
                "#SP 1\n" +
                "ADDI SP 1";
        assertEquals(expected, program.toString());
    }

}
