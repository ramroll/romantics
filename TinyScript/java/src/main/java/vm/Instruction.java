package vm;

import translator.Symbol;
import translator.SymbolType;

import java.util.ArrayList;

public class Instruction {
    private OpCode code;
    ArrayList<Operand> opList = new ArrayList<>();

    public Instruction(OpCode code){
        this.code = code;
    }


    public static Instruction offsetInstruction(
            OpCode code,
            Register r1,
            Register r2,
            Offset offset) {
        var i = new Instruction(code);

        i.opList.add(r1);
        i.opList.add(r2);
        i.opList.add(offset);
        return i;

    }

    public static Instruction loadToRegister(Register target,  Symbol arg1) {
        // 转成整数，目前只支持整数，其他需要大家自己扩展
        if(arg1.getType() == SymbolType.IMMEDIATE_SYMBOL) {
            return offsetInstruction(OpCode.LW, target, Register.STATIC,  new Offset(arg1.getOffset()));
        } else {
            return offsetInstruction(OpCode.LW, target, Register.SP, new Offset(arg1.getOffset()));
        }

    }

    public static Instruction saveToMemory(Register source, Symbol result) {
        return offsetInstruction(OpCode.SW, source, Register.SP, new Offset(result.getOffset()));
    }

    public static Instruction register(OpCode code, Register a, Register b, Register c) {
        var i = new Instruction(code);
        i.opList.add(a);
        if(b != null) {
            i.opList.add(b);
        }
        if(c != null) {
            i.opList.add(c);
        }
        return i;
    }


    public static Instruction immediate(OpCode code, Register r, ImmediateNumber number) {
        var i = new Instruction(code);
        i.opList.add(r);
        i.opList.add(number);
        return null;
    }
}
