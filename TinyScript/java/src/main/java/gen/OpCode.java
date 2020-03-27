package gen;


public class OpCode {

    private String name;
    private int value;
    private AddressingType addressingType;

    public OpCode(AddressingType type, String name, int value){
        this.addressingType = type;
        this.name = name;
        this.value = value;
    }

    public static final OpCode ADD = new OpCode(AddressingType.REGISTER, "ADD", 0x01);
    public static final OpCode SUB = new OpCode(AddressingType.REGISTER, "SUB", 0x02);
    public static final OpCode MULT = new OpCode(AddressingType.REGISTER, "MULT", 0x03);

    public static final OpCode ADDI = new OpCode(AddressingType.IMMEDIATE, "ADDI", 0x05);
    public static final OpCode SUBI = new OpCode(AddressingType.IMMEDIATE, "SUBI", 0x06);
    public static final OpCode MULTI = new OpCode(AddressingType.IMMEDIATE, "MULTI", 0x07);

    public static final OpCode MFLO = new OpCode(AddressingType.REGISTER, "MFLO", 0x08);



    public static final OpCode SW = new OpCode(AddressingType.OFFSET, "SW", 0x10);
    public static final OpCode LW = new OpCode(AddressingType.OFFSET, "LW", 0x11);


    public static final OpCode JUMP = new OpCode(AddressingType.JUMP, "JUMP", 0x20);
    public static final OpCode JR = new OpCode(AddressingType.JUMP, "JR", 0x21);

}
