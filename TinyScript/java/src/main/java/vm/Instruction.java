package vm;

import java.util.ArrayList;

public class Instruction {
    private OpCode code;
    ArrayList<Operand> opList = new ArrayList<>();

    public Instruction(OpCode code){
        this.code = code;
    }


    public static Instruction offsetInstruction(
            OpCode code,
            Register r1,
            Register r2,
            Offset offset) {
        var i = new Instruction(code);

        i.opList.add(r1);
        i.opList.add(r2);
        i.opList.add(offset);
        return i;

    }
}
