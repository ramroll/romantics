package translator;

import java.util.ArrayList;
import java.util.Hashtable;

public class TAProgram {

    private ArrayList<TACode> opcodes = new ArrayList<>();
    private Hashtable<String, Integer> labels = new Hashtable<>();
    private int labelCounter = 0;

    public void add(TACode code) {
        opcodes.add(code);
    }

    public ArrayList<TACode> getOpCodes() {
        return opcodes;
    }

    public String createLabel(){
        var label = "L" + labelCounter++;
        this.labels.put(label, this.opcodes.size());
        return label;
    }


    public TACode createIfCode(Address exprResult) {
        var code = new TACode(TACodeTypes.IF_GOTO);
//        code.setArg1(result)
//        var label = this.createLabel();
//        code.setLabel(label);
        return code;

    }
}

