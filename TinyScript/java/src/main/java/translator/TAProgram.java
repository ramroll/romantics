package translator;

import org.apache.commons.lang3.StringUtils;

import javax.naming.directory.Attributes;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;

public class TAProgram {

    private ArrayList<TACode> opcodes = new ArrayList<>();
    private Hashtable<String, Address> labels = new Hashtable<>();
    private int labelCounter = 0;
    private Hashtable<Integer, Address> lineLabels = new Hashtable<>();

    public void add(TACode code) {
        opcodes.add(code);
    }

    public ArrayList<TACode> getOpCodes() {
        return opcodes;
    }





    public TACode createIfCode(Address exprResult) {
        var code = new TACode(TACodeTypes.IF_GOTO);
        code.setArg1(exprResult);
        opcodes.add(code);
        return code;
    }

    public TACode lastOpCode() {
        return this.opcodes.get(this.opcodes.size() - 1);
    }

    @Override
    public String toString() {
        var lines = new ArrayList<String>();
        for(var opcode : opcodes) {
            lines.add(opcode.toString());
        }
        return StringUtils.join(lines, "\n");
    }

    public void bindLabelToNext(Address labelAddr) {
        labelAddr.offset = this.opcodes.size();
        this.lineLabels.put(labelAddr.offset, labelAddr);
        this.labels.put(labelAddr.label, labelAddr);
    }

    public TACode addLabel() {
        var label = "L" + labelCounter++;
        var taCode = new TACode(TACodeTypes.LABEL);
        taCode.setResult(new Address(label));
        opcodes.add(taCode);
        return taCode;
    }
}

