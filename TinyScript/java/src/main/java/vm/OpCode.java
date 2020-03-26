package vm;


public class OpCode {

    private String name;
    private int value;
    private AddressingType addressingType;

    public OpCode(AddressingType type, String name, int value){
        this.addressingType = type;
        this.name = name;
        this.value = value;
    }

    public static final OpCode ADD = new OpCode(AddressingType.IMMEDIATE, "ADDI", 0x01);
    public static final OpCode SUB = new OpCode(AddressingType.IMMEDIATE, "SUBI", 0x02);
    public static final OpCode MULT = new OpCode(AddressingType.IMMEDIATE, "MULTI", 0x03);

    public static final OpCode SW = new OpCode(AddressingType.OFFSET, "MULTI", 0x10);
    public static final OpCode LW = new OpCode(AddressingType.OFFSET, "MULTI", 0x11);

}
