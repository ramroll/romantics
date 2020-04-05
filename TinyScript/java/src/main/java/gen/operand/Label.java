package gen.operand;

import gen.operand.Operand;

public class Label extends Offset{
    String label;
    public Label(String label){
        super(0);
        this.label = label;
    }

   public String getLabel() {
        return this.label;
    }
    @Override
    public String toString() {
        return this.label;
    }
}
