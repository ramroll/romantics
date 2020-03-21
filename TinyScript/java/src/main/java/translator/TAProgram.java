package translator;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Hashtable;

public class TAProgram {

    private ArrayList<TAInstruction> opcodes = new ArrayList<>();
    private Hashtable<String, TAValue> labels = new Hashtable<>();
    private int labelCounter = 0;
    private Hashtable<Integer, TAValue> lineLabels = new Hashtable<>();

    public void add(TAInstruction code) {
        opcodes.add(code);
    }

    public ArrayList<TAInstruction> getOpCodes() {
        return opcodes;
    }


    @Override
    public String toString() {
        var lines = new ArrayList<String>();
        for(var opcode : opcodes) {
            lines.add(opcode.toString());
        }
        return StringUtils.join(lines, "\n");
    }

    public TAInstruction addLabel() {
        var label = "L" + labelCounter++;
        var taCode = new TAInstruction(TAOpCodeType.LABEL, null, null, null, null);
        taCode.setArg1(label);
        opcodes.add(taCode);
        return taCode;
    }


    public TAInstruction lastOpCode() {
        return this.opcodes.get(opcodes.size()-1);
    }
}

