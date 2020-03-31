package vm;

import gen.OpCode;
import gen.operand.Register;

import java.util.ArrayList;

public class VirtualMachine {

    long registers[] = new long[31];
    long[] memory = new long[4096];

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

        /**
         * 栈指针
         */
        registers[Register.SP.getAddr()] = 4096;
    }


}
