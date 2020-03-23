package vm;

import translator.TAProgram;

public class OpCodeGen {

    public OpCodeProgram gen(TAProgram taProgram){
        var program = new OpCodeProgram();

        var taInstructions = taProgram.getInstructions();

        for(var taInstruction : taInstructions) {
            switch(taInstruction.getType()) {
            }
        }

        return program;
    }
}
