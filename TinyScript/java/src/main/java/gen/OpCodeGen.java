package gen;

import gen.operand.ImmediateNumber;
import gen.operand.Label;
import gen.operand.Offset;
import gen.operand.Register;
import org.apache.commons.lang3.NotImplementedException;
import translator.*;
import translator.symbol.Symbol;

import javax.print.DocFlavor;
import java.util.Hashtable;

public class OpCodeGen {

    public OpCodeProgram gen(TAProgram taProgram){
        var program = new OpCodeProgram();

        var taInstructions = taProgram.getInstructions();

        var labelHash = new Hashtable<String, Integer>();

        for(var taInstruction : taInstructions) {

            program.addComment(taInstruction.toString());
            switch(taInstruction.getType()) {
                case ASSIGN:
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
                case LABEL:
                    if(taInstruction.getArg2() != null && taInstruction.getArg2().equals("main")) {
                        program.setEntry(program.instructions.size());
                    }
                    labelHash.put((String) taInstruction.getArg1(), program.instructions.size());
                    break;
                case RETURN:
                    genReturn(program, taInstruction);
                    break;
                case FUNC_BEGIN:
                    genFuncBegin(program, taInstruction);
                    break;
                case IF: {
                    genIf(program, taInstruction);
                    break;
                }
                default:
                    throw new NotImplementedException("Unknown type:" + taInstruction.getType());
            }

        }

        this.relabel(program, labelHash);

        return program;
    }

    private void genIf(OpCodeProgram program, TAInstruction instruction) {
//        var exprAddr = (Symbol)instruction.getArg1();
        var label = instruction.getArg2();
        program.add(Instruction.bne(Register.S2, Register.ZERO, (String) label));
    }

    private void genReturn(OpCodeProgram program, TAInstruction taInstruction) {
        var ret = (Symbol)taInstruction.getArg1();
        if(ret != null) {
            program.add(Instruction.loadToRegister(Register.S0, ret));
        }
        program.add(Instruction.offsetInstruction(
                OpCode.SW ,Register.S0, Register.SP, new Offset(1)
        ));

        var i = new Instruction(OpCode.RETURN);
        program.add(i);
    }

    /**
     * 重新计算Label的偏移量
     * @param program
     * @param labelHash
     */
    private void relabel(OpCodeProgram program, Hashtable<String, Integer> labelHash){
        program.instructions.forEach(instruction -> {
            if(instruction.getOpCode() == OpCode.JUMP || instruction.getOpCode() == OpCode.JR || instruction.getOpCode() == OpCode.BNE) {
                var idx = instruction.getOpCode()==OpCode.BNE?2 : 0;
                var labelOperand = (Label)instruction.opList.get(idx);
                var label = labelOperand.getLabel();
                var offset = labelHash.get(label);
                labelOperand.setOffset(offset);
            }
        });

    }

    private void genSp(OpCodeProgram program, TAInstruction taInstruction) {
        var offset = (int)taInstruction.getArg1();
        if(offset > 0) {
            program.add(Instruction.immediate(OpCode.ADDI, Register.SP,
                    new ImmediateNumber(offset)));
        }
        else {
            program.add(Instruction.immediate(OpCode.SUBI, Register.SP,
                    new ImmediateNumber(-offset)));
        }
    }

    private void genPass(OpCodeProgram program, TAInstruction taInstruction) {
        var arg1 = (Symbol)taInstruction.getArg1();
        var no = (int)taInstruction.getArg2();
        program.add(Instruction.loadToRegister(Register.S0, arg1));
        // PASS a
        program.add(Instruction.offsetInstruction(OpCode.SW, Register.S0, Register.SP,
                new Offset(-(no))));
    }

    void genFuncBegin(OpCodeProgram program, TAInstruction ta) {
        var i = Instruction.offsetInstruction(OpCode.SW, Register.RA, Register.SP, new Offset(0));
        program.add(i);
    }

    void genCall(OpCodeProgram program, TAInstruction ta){
        var label = (Symbol)ta.getArg1();
        var i = new Instruction(OpCode.JR);
        i.opList.add(new Label(label.getLabel()));
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
        var arg2 = (Symbol)ta.getArg2();
        if(arg2 == null) {
            program.add(Instruction.loadToRegister(Register.S0, arg1));
            program.add(Instruction.saveToMemory(Register.S0, result));
        } else {
            program.add(Instruction.loadToRegister(Register.S0, arg1));
            program.add(Instruction.loadToRegister(Register.S1, arg2));

            switch (op) {
                case "+":
                    program.add(Instruction.register(OpCode.ADD, Register.S2, Register.S0, Register.S1));
                    break;
                case "-":
                    program.add(Instruction.register(OpCode.SUB, Register.S2, Register.S0, Register.S1));
                    break;
                case "*":
                    program.add(Instruction.register(OpCode.MULT, Register.S0, Register.S1,null));
                    program.add(Instruction.register(OpCode.MFLO, Register.S2, null, null));
                    break;
                case "==" :
                    program.add(Instruction.register(OpCode.EQ, Register.S2, Register.S1, Register.S0));
                    break;
            }
            program.add(Instruction.saveToMemory(Register.S2, result));
        }
    }
}
