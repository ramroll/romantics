package vm;

import translator.TAInstruction;
import translator.TAProgram;

public class OpCodeGen {

    public OpCodeProgram gen(TAProgram taProgram){
        var program = new OpCodeProgram();

        var taInstructions = taProgram.getInstructions();

        for(var taInstruction : taInstructions) {
            switch(taInstruction.getType()) {
                case COPY:
                    genCopy(taInstruction);
                    break;


            }
        }

        return program;
    }

    void genCopy(TAInstruction ta) {
        var result = ta.getResult();
        var op = ta.getOp();
        if(op == null) {
            // src : a = b
            // trans :
            //   

        }
    }
}
