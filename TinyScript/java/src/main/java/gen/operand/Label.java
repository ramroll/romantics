package gen.operand;

import gen.operand.Operand;

public class Label extends Operand {
    String label;
    int offset;
    public Label(String label){
        this.label = label;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getOffset(){
        return this.offset;
    }

    public String getLabel() {
        return this.label;
    }
}
