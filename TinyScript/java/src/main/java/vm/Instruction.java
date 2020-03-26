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

    public static Instruction add(Register result, Register a, Register b) {
        var i = new Instruction(OpCode.ADD);
        i.opList.add(result);
        i.opList.add(a);
        i.opList.add(b);
        return i;
    }

    public static Instruction sub(Register result, Register a, Register b) {
        var i = new Instruction(OpCode.SUB);
        i.opList.add(result);
        i.opList.add(a);
        i.opList.add(b);
        return i;
    }
}
