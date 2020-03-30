package gen.operand;

import gen.operand.Operand;

public class Offset extends Operand {

    int offset;
    public Offset(int offset) {
        super();
        this.offset = offset;
    }

    @Override
    public String toString() {
        return this.offset + "";
    }

    public int getOffset(){
        return offset;
    }
}
