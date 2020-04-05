package gen.operand;

import gen.GeneratorException;

public class Register extends Operand {
    private byte addr;
    private String name;

    private static Register[] registers = new Register[31];

    public Register(String name, byte addr) {
        this.name = name;
        this.addr = addr;
        registers[addr] = this;
    }

    public static final Register ZERO = new Register("ZERO", (byte) 1);
    public static final Register PC = new Register("PC", (byte) 2);
    public static final Register SP = new Register("SP", (byte) 3);
    public static final Register STATIC = new Register("STATIC", (byte) 4);
    public static final Register RA = new Register("RA", (byte)5);

    public static final Register S0 = new Register("S0", (byte) 10);
    public static final Register S1 = new Register("S1", (byte) 11);
    public static final Register S2 = new Register("S2", (byte) 12);

    public static final Register LO = new Register("LO", (byte) 20);

    public static Register fromAddr(long reg) throws GeneratorException {
        if(reg < 0 || reg >= registers.length ) {
            throw new GeneratorException("No Register's address is "  + reg);
        }
        if(registers[(int)reg] == null) {
            throw new GeneratorException("No Register's address is "  + reg);
        }
        return registers[(int) reg];
    }


    @Override
    public String toString() {
        return this.name;
    }

    public byte getAddr() {
        return this.addr;
    }

}
