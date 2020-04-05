package gen;

import gen.operand.ImmediateNumber;
import gen.operand.Label;
import gen.operand.Offset;
import gen.operand.Register;
import org.junit.jupiter.api.Test;
import translator.symbol.Symbol;
import translator.symbol.SymbolType;

import java.util.LinkedList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

public class ByteCodeTests {

    @Test
    public void add() throws GeneratorException {
        var a = new Instruction(OpCode.ADD);
        a.opList.add(Register.S2);
        a.opList.add(Register.S0);
        a.opList.add(Register.S1);
        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }

    void assertSameInstruction(Instruction a, Instruction b) throws GeneratorException {
        assertEquals(a.getOpCode(), b.getOpCode());
        assertEquals(a.opList.size(), b.opList.size());
        for(var i = 0; i  < a.opList.size(); i++) {
            var p = a.opList.get(i);
            var q = b.opList.get(i);
            if(p.getClass() == Label.class) {
                assertEquals(q.getClass(), Offset.class);
            } else {
                assertEquals(p.getClass(), q.getClass());
            }
            if(p.getClass() == ImmediateNumber.class) {
                assertEquals(((ImmediateNumber) p).getValue(), ((ImmediateNumber)q).getValue());
            } else if(p.getClass() == Offset.class) {
                assertEquals(((Offset)p).getOffset(), ((Offset)q).getOffset());
            } else if(p.getClass() == Register.class) {
                assertEquals(((Register)p).getAddr(), ((Register)q).getAddr());
            } else if(p.getClass() == Label.class) {
                assertEquals(((Label)p).getOffset(), ((Offset)q).getOffset());
            } else {
                throw new GeneratorException("Unsupported encode/decode type:" + p.getClass());
            }
        }
    }

    @Test
    public void mult() throws GeneratorException {
        var a = new Instruction(OpCode.MULT);
        a.opList.add(Register.S0);
        a.opList.add(Register.S1);

        var byteCode = a.toByteCode();
        var b = Instruction.fromByCode(byteCode);
        assertSameInstruction(a, b);
    }


    @Test
    public void jump() throws GeneratorException {
        var a = new Instruction(OpCode.JUMP);
        var label = new Label("L0");
        a.opList.add(label);
        label.setOffset(-100);
        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }

    @Test
    public void jr() throws GeneratorException {
        var a = new Instruction(OpCode.JR);
        var label = new Label("L0");
        a.opList.add(label);
        label.setOffset(100);
        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }

    @Test
    public void sw() throws GeneratorException {
        var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
        symbol.setOffset(-100);
        var a = Instruction.saveToMemory(Register.S0, symbol);

        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }


    @Test
    public void sw1() throws GeneratorException {
        var symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL);
        symbol.setOffset(-100);
        var a = Instruction.saveToMemory(Register.S0, symbol);

        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }

    @Test
    public void lw() throws GeneratorException {
        var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
        symbol.setOffset(100);
        var a = Instruction.loadToRegister(Register.S0, symbol);

        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }


    @Test
    public void lw1() throws GeneratorException {
        var symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL);
        symbol.setOffset(100);
        var a = Instruction.loadToRegister(Register.S0, symbol);

        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }

    @Test
    public void sp() throws GeneratorException {
        var a = Instruction.immediate(OpCode.ADDI, Register.SP, new ImmediateNumber(100));
        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }

    @Test
    public void bne() throws GeneratorException {
        var a = Instruction.bne(Register.S0, Register.S1, "L0");
        ((Label)a.opList.get(2)).setOffset(100);

        assertSameInstruction(a, Instruction.fromByCode(a.toByteCode()));
    }

}
