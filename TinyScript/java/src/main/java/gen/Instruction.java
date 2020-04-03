package gen;

import gen.operand.*;
import org.apache.commons.lang3.StringUtils;
import translator.symbol.Symbol;
import translator.symbol.SymbolType;

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

    public static Instruction loadToRegister(Register target,  int offset) {
        // 转成整数，目前只支持整数，其他需要大家自己扩展
        return offsetInstruction(OpCode.LW, target, Register.STATIC,  new Offset(offset));
    }

    public static Instruction saveToMemory(Register source, int offset) {
        return offsetInstruction(OpCode.SW, source, Register.SP, new Offset(offset));
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

    public OpCode getOpCode() {
        return this.code;
    }

    @Override
    public String toString() {
        String s = this.code.toString();

        var prts = new ArrayList<String>();
        for(var op : this.opList) {
            prts.add(op.toString());
        }
        return s + " " + StringUtils.join(prts, " ");
    }

    public static Instruction fromByCode(long code){

        byte byteOpcode = (byte) (code & 0xf8000000 >> 26);
        var opcode = OpCode.fromByte(byteOpcode);
        var i = new Instruction(opcode);


        switch (opcode.getType()) {
            case IMMEDIATE: {
                var reg = code & 0x078000000;
                var number = code & 0x007fffff;
                i.opList.add(Register.fromAddr(reg));
                i.opList.add(new ImmediateNumber((int) number));
                break;
            }
            case REGISTER: {
                var r1Addr = code & 0x078000000;
                var r2Addr = code & 0x007800000;
                var r3Addr = code & 0x000780000;
                var r1 = Register.fromAddr(r1Addr);
                var r2 = Register.fromAddr(r2Addr);
                var r3 = Register.fromAddr(r3Addr);
                i.opList.add(r1);
                if(r2 != null) {
                    i.opList.add(r2);
                }
                if(r3 != null) {
                    i.opList.add(r3);
                }
                break;
            }
            case JUMP: {
                var offset = code & 0x07fffffff;
                i.opList.add(new Offset((int) offset));
                break;
            }
            case OFFSET: {
                var r1Addr = code & 0x078000000;
                var r2Addr = code & 0x007800000;
                var offset = code & 0x0007fffff;
                i.opList.add(Register.fromAddr(r1Addr));
                i.opList.add(Register.fromAddr(r2Addr));
                var label = new Label("");
                label.setOffset((int) offset);
                i.opList.add(label);
                break;
            }
        }

        return i;

    }

    public Long toByteCode() {

        long code = 0;
        code |= this.code.getValue() << 26;
        switch (this.code.getType()) {
            case IMMEDIATE: {
                code |= ((ImmediateNumber)this.opList.get(1)).getValue();
                return code;
            }
            case REGISTER: {
                var r1 = (Register)this.opList.get(0);
                code |= r1.getAddr() << 21;
                if(this.opList.size() > 1) {
                    code |= ((Register)this.opList.get(1)).getAddr() << 16;
                    if(this.opList.size() > 2) {
                        code |= r1.getAddr() << 11;
                    }
                }
                break;
            }
            case JUMP:
                code |= ((Label)this.opList.get(0)).getOffset();
                break;

            case OFFSET:
                var r1 = (Register)this.opList.get(0);
                var r2 = (Register)this.opList.get(2);
                var offset = (Offset)this.opList.get(2);
                code |= r1.getAddr() << 26;
                code |= r2.getAddr() << 21;
                code |= offset.getOffset() << 16;
                break;
        }
        return code;
    }

    public Operand getOperand(int index) {
        return this.opList.get(index);
    }
}
