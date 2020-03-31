package gen;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Hashtable;

public class OpCodeProgram {

    ArrayList<Instruction> instructions = new ArrayList<>();
    public void add(Instruction i) {
        this.instructions.add(i);
    }

    @Override
    public String toString() {
        ArrayList<String> prts = new ArrayList<>();
        System.out.println(instructions.size());
        for(var instruction : instructions) {
            prts.add(instruction.toString());
        }
        return StringUtils.join(prts, "\n");
    }

    public ArrayList<Long> toByteCodes() {
        var codes = new ArrayList<Long>();

        for(var instruction : instructions) {
            codes.add(instruction.toByteCode());
        }
        return codes;

    }

}
