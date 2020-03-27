package gen;

public class Register extends Operand {
    private int addr;
    private String name;

    public Register(String name, int addr) {
        this.name = name;
        this.addr = addr;
    }

    public static final Register ZERO = new Register("ZERO", 0);
    public static final Register PC = new Register("PC", 1);
    public static final Register SP = new Register("SP", 2);
    public static final Register STATIC = new Register("STATIC", 3);

    public static final Register S0 = new Register("S0", 10);
    public static final Register S1 = new Register("S1", 11);
    public static final Register S2 = new Register("S1", 12);
}
