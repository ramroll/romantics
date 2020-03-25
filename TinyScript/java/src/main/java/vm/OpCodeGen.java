package vm;

import translator.*;

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
            //   addi $s0, $0, b
            //   sw $s0 a($sp)
            //   $s0 <- b
            //   $s0 -> a
            if(arg1.getType() == SymbolType.IMMEDIATE_SYMBOL) {
                var i1 = new Instruction(OpCode.ADDI);
                i1.opList.add(Register.S0);
                i1.opList.add(Register.ZERO);

                // 因为是教学，这里只考虑整数的情况
                i1.opList.add(new ImmediateNumber(
                        Integer.parseInt(arg1.getLexeme().getValue()))
                );

                var i2 = Instruction.offsetInstruction(
                        OpCode.SW, Register.S0, Register.SP, new Offset(result.getOffset()));

                program.add(i1);
                program.add(i2);
            }
            // case : a = b
            //   lw $s0 b($sp)
            //   sw $s0 a($sp)
            else if(arg1.getType() == SymbolType.ADDRESS_SYMBOL) {
                var i1 = Instruction.offsetInstruction(
                        OpCode.LW, Register.S0, Register.SP, new Offset(arg1.getOffset()));

                var i2 = Instruction.offsetInstruction(
                        OpCode.SW, Register.S0, Register.SP, new Offset(result.getOffset()));

                program.add(i1);
                program.add(i2);

            }

        } else {

        }
    }
}
