package translator;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Hashtable;

public class TAProgram {

    private ArrayList<TAInstruction> instructions = new ArrayList<>();
    private Hashtable<String, Symbol> labels = new Hashtable<>();
    private int labelCounter = 0;
    private Hashtable<Integer, Symbol> lineLabels = new Hashtable<>();

    public void add(TAInstruction code) {
        instructions.add(code);
    }

    public ArrayList<TAInstruction> getInstructions() {
        return instructions;
    }


    @Override
    public String toString() {
        var lines = new ArrayList<String>();
        for(var opcode : instructions) {
            lines.add(opcode.toString());
        }
        return StringUtils.join(lines, "\n");
    }

    public TAInstruction addLabel() {
        var label = "L" + labelCounter++;
        var taCode = new TAInstruction(TAInstructionType.LABEL, null, null, null, null);
        taCode.setArg1(label);
        instructions.add(taCode);
        return taCode;
    }


    public TAInstruction lastOpCode() {
        return this.instructions.get(instructions.size()-1);
    }



}

