package gen;


public class OpCode {

    private String name;
    private byte value;
    private AddressingType addressingType;

    private static OpCode[] codes = new OpCode[63];

    public OpCode(AddressingType type, String name, byte value){
        this.addressingType = type;
        this.name = name;
        this.value = value;
        codes[value] = this;
    }


    public static final OpCode ADD = new OpCode(AddressingType.REGISTER, "ADD", (byte) 0x01);
    public static final OpCode SUB = new OpCode(AddressingType.REGISTER, "SUB", (byte) 0x02);
    public static final OpCode MULT = new OpCode(AddressingType.REGISTER, "MULT", (byte) 0x03);

    public static final OpCode ADDI = new OpCode(AddressingType.IMMEDIATE, "ADDI", (byte) 0x05);
    public static final OpCode SUBI = new OpCode(AddressingType.IMMEDIATE, "SUBI", (byte) 0x06);
    public static final OpCode MULTI = new OpCode(AddressingType.IMMEDIATE, "MULTI", (byte) 0x07);

    public static final OpCode MFLO = new OpCode(AddressingType.REGISTER, "MFLO", (byte) 0x08);

    public static final OpCode EQ = new OpCode(AddressingType.REGISTER, "EQ", (byte) 0x09);
    public static final OpCode BNE = new OpCode(AddressingType.OFFSET, "BNE", (byte) 0x15);



    public static final OpCode SW = new OpCode(AddressingType.OFFSET, "SW", (byte) 0x10);
    public static final OpCode LW = new OpCode(AddressingType.OFFSET, "LW", (byte) 0x11);


    public static final OpCode JUMP = new OpCode(AddressingType.JUMP, "JUMP", (byte) 0x20);
    public static final OpCode JR = new OpCode(AddressingType.JUMP, "JR", (byte) 0x21);
    public static final OpCode RETURN = new OpCode(AddressingType.JUMP, "RETURN", (byte) 0x22);

    public static OpCode fromByte(byte byteOpcode) {
        return codes[byteOpcode];
    }

    @Override
    public String toString() {
        return name;
    }

    public AddressingType getType(){
        return this.addressingType;
    }

    public byte getValue() {
        return this.value;
    }
}
