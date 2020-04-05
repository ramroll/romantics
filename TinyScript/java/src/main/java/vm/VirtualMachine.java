package vm;

import gen.GeneratorException;
import gen.Instruction;
import gen.OpCode;
import gen.operand.ImmediateNumber;
import gen.operand.Offset;
import gen.operand.Register;

import java.util.ArrayList;

public class VirtualMachine {

    int registers[] = new int[31];
    int[] memory = new int[4096];
    int endProgramSection = 0;
    int startProgram = 0;

    /**
     * 初始化
     */
    public VirtualMachine(ArrayList<Integer> staticArea, ArrayList<Integer> opcodes, Integer entry) {

        int i = 0;
        /**
         * 静态区
         */
        for(; i < staticArea.size(); i++) {
            memory[i] = staticArea.get(i);
        }

        /**
         * 程序区
         */
        int j = i;
        startProgram = i;
        int mainStart = entry + i;
        for(; i  < opcodes.size() + j; i++) {
            memory[i] = opcodes.get(i - j);
        }
        registers[Register.PC.getAddr()] = i-3;
        endProgramSection = i;

        /**
         * 栈指针
         */
        registers[Register.SP.getAddr()] = 4095;
    }

    private int fetch() {
        var PC = registers[Register.PC.getAddr()];
        return memory[(int) PC];
    }

    private Instruction decode(int code) throws GeneratorException {
        return Instruction.fromByCode(code);
    }

    private void exec(Instruction instruction) {

        byte code = instruction.getOpCode().getValue();
        System.out.println("exec:" + instruction);

        switch (code) {
            case 0x01: { // ADD
                var r0 = (Register)instruction.getOperand(0);
                var r1 = (Register)instruction.getOperand(1);
                var r2 = (Register)instruction.getOperand(2);
                registers[r0.getAddr()] = registers[r1.getAddr()] + registers[r2.getAddr()];
                break;
            }
            case 0x09:
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
                registers[Register.LO.getAddr()] = registers[r0.getAddr()] * registers[r1.getAddr()];
                break;
            }
            case 0x05: { // ADDI
                var r0 = (Register) instruction.getOperand(0);
                var r1 = (ImmediateNumber) instruction.getOperand(1);
                registers[r0.getAddr()] += r1.getValue();
                break;
            }
            case 0x06: { // SUBI
                var r0 = (Register) instruction.getOperand(0);
                var r1 = (ImmediateNumber) instruction.getOperand(1);
                registers[r0.getAddr()] -= r1.getValue();
                break;
            }
//            case 0x07: // MULTI
//                break;
            case 0x08: { // MFLO
                var r0 = (Register) instruction.getOperand(0);
                registers[r0.getAddr()] = registers[Register.LO.getAddr()];
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
            case 0x15 : { // BNE
                var r0 = (Register)instruction.getOperand(0);
                var r1 = (Register)instruction.getOperand(1);
                var offset = (Offset)instruction.getOperand(2);
                if(registers[r0.getAddr()] != registers[r1.getAddr()]) {
                    registers[Register.PC.getAddr()] = offset.getOffset() + startProgram - 1;
                }
                break;
            }
            case 0x20 : { // JUMP
                var r0 = (Offset) instruction.getOperand(0);
                registers[Register.PC.getAddr()] = r0.getOffset() + startProgram - 1;
                break;
            }
            case 0x21: { // JR
                var r0 = (Offset) instruction.getOperand(0);
                // 将返回地址存入ra
                registers[Register.RA.getAddr()] = registers[Register.PC.getAddr()];
                registers[Register.PC.getAddr()] = r0.getOffset() + startProgram - 1;

                break;
            }
            case 0x22 : { // RETURN
                if(instruction.getOperand(0) != null) {
                    // match返回值
                }
                var spVal = registers[Register.SP.getAddr()];
                registers[Register.PC.getAddr()] = memory[spVal];
                break;
            }

        }

    }

    public boolean runOneStep() throws GeneratorException {
        var code = fetch();
        var instruction = decode(code);
        exec(instruction);
        registers[Register.PC.getAddr()] += 1;
        System.out.println(registers[Register.PC.getAddr()] + "|" + endProgramSection);
        return registers[Register.PC.getAddr()] < endProgramSection;
    }

    public void run() throws GeneratorException {

        // 模拟CPU循环
        //   fetch: 获取指令
        //   decode: 解码
        //   exec: 执行
        //   PC++
        while(runOneStep());
    }


    public int[] getMemroy() {
        return memory;
    }

    public int[] getRegisters(){
        return registers;
    }


    public int getSpMemory(int offset) {
        var sp = registers[Register.SP.getAddr()];
        return memory[sp + offset];
    }
}
