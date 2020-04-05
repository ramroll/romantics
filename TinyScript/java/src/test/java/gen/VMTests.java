package gen;

import gen.operand.Register;
import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import parser.Parser;
import parser.util.ParseException;
import translator.Translator;
import vm.VirtualMachine;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class VMTests {

    @Test
    public void calcExpr() throws LexicalException, ParseException, GeneratorException {
        var source = "func main() int { var a = 2*3+4 \n return \n }";
        var astNode = Parser.parse(source);
        var translator = new Translator();
        var taProgram = translator.translate(astNode);
        System.out.println(taProgram);
        System.out.println("----");
        System.out.println(taProgram.getStaticSymbolTable());
        var gen = new OpCodeGen();
        var program = gen.gen(taProgram);
        System.out.println(program);
        var statics = program.getStaticArea(taProgram);
        var entry = program.getEntry();
        var opcodes = program.toByteCodes();

        var vm = new VirtualMachine(statics, opcodes, entry);
        // CALL main
        vm.runOneStep();
        vm.runOneStep();
        vm.runOneStep();
        System.out.println("RA:" + vm.getRegisters()[Register.RA.getAddr()]);
        assertEquals(18, vm.getSpMemory(0));

        // p0 = 2 * 3
        vm.runOneStep();
        vm.runOneStep();
        vm.runOneStep();
        vm.runOneStep();
        vm.runOneStep();
        assertEquals(2, vm.getRegisters()[Register.S0.getAddr()]);
        assertEquals(3, vm.getRegisters()[Register.S1.getAddr()]);
        assertEquals(6, vm.getRegisters()[Register.LO.getAddr()]);
        assertEquals(6, vm.getRegisters()[Register.S2.getAddr()]);
        assertEquals(6, vm.getSpMemory(-2));

        // p1 = p0 + 4
        vm.runOneStep();

        vm.runOneStep();

        vm.runOneStep();
        vm.runOneStep();
        assertEquals(6, vm.getRegisters()[Register.S0.getAddr()]);
        assertEquals(4, vm.getRegisters()[Register.S1.getAddr()]);
        assertEquals(10, vm.getRegisters()[Register.S2.getAddr()]);
        assertEquals(10, vm.getSpMemory(-3));

        // a = p1
        vm.runOneStep();
        vm.runOneStep();
        assertEquals(10, vm.getSpMemory(-1));
        assertEquals(10, vm.getRegisters()[Register.S0.getAddr()]);

        // RETURN null
        vm.runOneStep();
        vm.runOneStep();
        vm.runOneStep();

        System.out.println("SP:" + vm.getRegisters()[Register.SP.getAddr()]);
    }
}
