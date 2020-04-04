package gen.operand;


import gen.operand.Operand;

public class ImmediateNumber extends Operand {
    private int value;
    public ImmediateNumber(int value) {
        this.value = value;

    }

    public int getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return this.value + "";
    }
}
