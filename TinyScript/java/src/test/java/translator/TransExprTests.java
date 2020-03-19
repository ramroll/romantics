package translator;

import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import parser.Parser;
import parser.util.GraphvizHelpler;
import parser.util.ParseException;
import translator.optimizer.ExprOptimizer;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class TransExprTests {

    void assertOpcodes(String[] lines, ArrayList<TACode> opcodes) {
        for(int i = 0; i < opcodes.size(); i++) {
            var opcode = opcodes.get(i);
            var strVal = opcode.toString();
            assertEquals(lines[i], strVal);
        }
    }

    @Test
    public void transExpr() throws LexicalException, ParseException {
        var source = "a+(b-c)+d*(b-c)*2";
        var p = Parser.parse(source);
        var exprNode = p.getChild(0);


        var translator = new Translator();
        var symbolTable = new SymbolTable();
        var program = new TAProgram();
        translator.translateExpr(program, exprNode, symbolTable);
        var expectedResults = new String[] {
                "p0 = b - c",
                "p1 = b - c",
                "p2 = p1 * 2",
                "p3 = d * p2",
                "p4 = p0 + p3",
                "p5 = a + p4"
        };
        assertOpcodes(expectedResults, program.getOpCodes());

    }

    @Test
    public void optimizeExpr() throws LexicalException, ParseException {
        var source = "a+(b-c)+d*(b-c)*2";
        var program = Parser.parse(source);
        var exprNode = program.getChild(0);
        var optimizer = new ExprOptimizer();
        optimizer.optimize(exprNode);

        var graphvizHelper = new GraphvizHelpler();
        var actual = graphvizHelper.toDot(exprNode);

        var expected = "v1[label=\"+\"]\n" +
                "v2[label=\"a\"]\n" +
                "\"v1\" -> \"v2\"\n" +
                "v3[label=\"+\"]\n" +
                "\"v1\" -> \"v3\"\n" +
                "v4[label=\"-\"]\n" +
                "\"v3\" -> \"v4\"\n" +
                "v5[label=\"*\"]\n" +
                "\"v3\" -> \"v5\"\n" +
                "v6[label=\"b\"]\n" +
                "\"v4\" -> \"v6\"\n" +
                "v7[label=\"c\"]\n" +
                "\"v4\" -> \"v7\"\n" +
                "v8[label=\"d\"]\n" +
                "\"v5\" -> \"v8\"\n" +
                "v9[label=\"*\"]\n" +
                "\"v5\" -> \"v9\"\n" +
                "\"v9\" -> \"v4\"\n" +
                "v10[label=\"2\"]\n" +
                "\"v9\" -> \"v10\"\n";
        assertEquals(expected, actual);
    }
}
