package gen;

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
                case GOTO:
                    genGoto(program, taInstruction);
                    break;
                case CALL:
                    genCall(program, taInstruction);
                    break;
                case PARAM:
                    genPass(program, taInstruction);
                    break;
                case SP:
                    genSp(program, taInstruction);
                    break;
                case RETURN:

            }
        }

        return program;
    }

    private void genSp(OpCodeProgram program, TAInstruction taInstruction) {
        var symbol = (Symbol)taInstruction.getArg1();
        program.add(Instruction.immediate(OpCode.ADDI, Register.SP,
                new ImmediateNumber(Integer.parseInt(symbol.getLexeme().getValue()))));

    }

    private void genPass(OpCodeProgram program, TAInstruction taInstruction) {
        var arg1 = (Symbol)taInstruction.getArg1();
        var no = (int)taInstruction.getArg2();
        program.add(Instruction.loadToRegister(Register.S0, arg1));
        // PASS a
        // 写入下一个活动记录(因此是负数offset)
        // 下一个活动记录0位置是返回值,1位置是返回地址(因此需要+2)
        program.add(Instruction.offsetInstruction(OpCode.SW, Register.S0, Register.SP, new Offset(-(no+2))));
    }

    void genCall(OpCodeProgram program, TAInstruction ta){
        var label = (String)ta.getArg1();
        var i = new Instruction(OpCode.JR);
        i.opList.add(new Label(label));
        program.add(i);
    }

    void genGoto(OpCodeProgram program, TAInstruction ta) {
        var label = (String)ta.getArg1();
        var i = new Instruction(OpCode.JUMP);
        // label对应的位置在relabel阶段计算
        i.opList.add(new Label(label));
        program.add(i);
    }

    void genCopy(OpCodeProgram program, TAInstruction ta) {
        var result = ta.getResult();
        var op = ta.getOp();
        var arg1 = (Symbol)ta.getArg1();
        if(op == null) {
            program.add(Instruction.loadToRegister(Register.S0, arg1));
            program.add(Instruction.saveToMemory(Register.S0, result));
        } else {
            var arg2 = (Symbol)ta.getArg2();
            program.add(Instruction.loadToRegister(Register.S0, arg1));
            program.add(Instruction.loadToRegister(Register.S1, arg2));

            switch (op) {
                case "+":
                    Instruction.register(OpCode.ADD, Register.S2, Register.S0, Register.S1);
                    break;
                case "-":
                    Instruction.register(OpCode.SUB, Register.S2, Register.S0, Register.S1);
                    break;
                case "*":
                    Instruction.register(OpCode.MULT, Register.S0, Register.S1,null);
                    Instruction.register(OpCode.MFLO, Register.S2, null, null);
                    break;
            }
            Instruction.saveToMemory(Register.S2, result);
        }
    }
}
