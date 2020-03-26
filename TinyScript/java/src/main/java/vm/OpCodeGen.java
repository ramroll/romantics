package vm;

import translator.*;

import javax.imageio.plugins.tiff.TIFFField;

public class OpCodeGen {

    public OpCodeProgram gen(TAProgram taProgram){
        var program = new OpCodeProgram();

        var taInstructions = taProgram.getInstructions();

        for(var taInstruction : taInstructions) {
            switch(taInstruction.getType()) {
                case COPY:
                    genCopy(program, taInstruction);
                    break;
            }
        }

        return program;
    }

    void genCopy(OpCodeProgram program, TAInstruction ta) {
        var result = ta.getResult();
        var op = ta.getOp();
        var arg1 = (Symbol)ta.getArg1();
        if(op == null) {
            var offset = arg1.getOffset();
            // case : a = 1
            //   lw $s0, b($static)
            //   sw $s0 a($sp)
            // case : a = b
            //   lw $s0 b($sp)
            //   sw $s0 a($sp)
            program.add(Instruction.loadToRegister(Register.S0, arg1));
            program.add(Instruction.saveToMemory(Register.S0, result));
        } else {
            var arg2 = (Symbol)ta.getArg2();
            program.add(Instruction.loadToRegister(Register.S0, arg1));
            program.add(Instruction.loadToRegister(Register.S1, arg2));

            switch (op) {
                case "+":
                    Instruction.add(Register.S0, Register.S0, Register.S2);
                    Instruction.saveToMemory(Register.S2, result);
                    break;
                case "-":
                    break;
                case "*":
                    break;
            }

        }
    }
}
