package gen;

import java.util.ArrayList;

public class OpCodeProgram {

    ArrayList<Instruction> instructions = new ArrayList<>();
    public void add(Instruction i) {
        this.instructions.add(i);
    }
}
