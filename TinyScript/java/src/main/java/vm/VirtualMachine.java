package vm;

import gen.Instruction;
import gen.OpCode;
import gen.operand.Offset;
import gen.operand.Register;

import java.util.ArrayList;

public class VirtualMachine {

    long registers[] = new long[31];
    long[] memory = new long[4096];
    int instructionSize = 0;

    /**
     * 初始化
     */
    public VirtualMachine(ArrayList<Long> staticArea, ArrayList<Long> opcodes) {

        int i = 0;
        /**
         * 静态区
         */
        memory[i++] = staticArea.size();
        for(; i < staticArea.size(); i++) {
            memory[i] = staticArea.get(i);
        }

        /**
         * 程序区
         */
        registers[Register.PC.getAddr()] = i;
        memory[i++] = opcodes.size();
        for(; i < opcodes.size(); i++) {
            memory[i] = opcodes.get(i);
        }
        instructionSize = opcodes.size();

        /**
         * 栈指针
         */
        registers[Register.SP.getAddr()] = 4096;
    }

    private long fetch() {
        var PC = registers[Register.PC.getAddr()];
        return memory[(int) PC];
    }

    private Instruction decode(long code) {
        return Instruction.fromByCode(code);
    }

    private void exec(Instruction instruction) {

        byte code = instruction.getOpCode().getValue();

        switch (code) {
            case 0x01: { // ADD
                var r0 = (Register)instruction.getOperand(0);
                var r1 = (Register)instruction.getOperand(1);
                var r2 = (Register)instruction.getOperand(2);
                registers[r0.getAddr()] = registers[r1.getAddr()] + registers[r2.getAddr()];
                break;
            }
            case 0x02: { // SUB
                var r0 = (Register) instruction.getOperand(0);
                var r1 = (Register) instruction.getOperand(1);
                var r2 = (Register) instruction.getOperand(2);
                registers[r0.getAddr()] = registers[r1.getAddr()] - registers[r2.getAddr()];
                break;
            }
            case 0x03: { // MULT
                var r0 = (Register) instruction.getOperand(0);
                var r1 = (Register) instruction.getOperand(1);
                var r2 = (Register) instruction.getOperand(2);
                registers[Register.LO.getAddr()] = registers[r1.getAddr()] * registers[r2.getAddr()];
                break;
            }
//            case 0x05: // ADDI
//                break;
//            case 0x06: // SUBI
//                break;
//            case 0x07: // MULTI
//                break;
            case 0x08: { // MFLO
                var r0 = (Register) instruction.getOperand(0);
                registers[r0.getAddr()] = registers[Register.LO.getAddr()]
                break;
            }
            case 0x10: { // SW
                var r0 = (Register) instruction.getOperand(0);
                var r1 = (Register) instruction.getOperand(1);
                var offset = (Offset) instruction.getOperand(2);
                var R1VAL = registers[r1.getAddr()];
                memory[(int) (R1VAL + offset.getOffset())] = registers[r0.getAddr()];
                break;
            }
            case 0x11: { //LW
                var r0 = (Register) instruction.getOperand(0);
                var r1 = (Register) instruction.getOperand(1);
                var offset = (Offset) instruction.getOperand(2);
                var R1VAL = registers[r1.getAddr()];
                registers[r0.getAddr()] = memory[(int) (R1VAL + offset.getOffset())];
                break;
            }
            case 0x20 : { // JUMP
                break;
            }
            case 0x21: // JR
                break;
        }

    }


    public void run() {


        while(true) {
            var code = fetch();
            var instruction = decode(code);
            exec(instruction);

        }



    }



}
