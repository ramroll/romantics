package gen;

import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import parser.Parser;
import parser.util.ParseException;
import translator.Translator;

public class ExprEvaluateTests {

    @Test
    public void exprEvaluate() throws LexicalException, ParseException {

        var source = "var a = 3*2*(5+1)";
        var astNode = Parser.parse(source);
        var translator = new Translator();
        var taProgram = translator.translate(astNode);
        System.out.println(taProgram.toString());
        var generator = new OpCodeGen();
        var program = generator.gen(taProgram);
        System.out.println(program.toString());
    }
}
