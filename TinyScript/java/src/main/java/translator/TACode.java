package translator;

import org.apache.commons.lang3.NotImplementedException;

public class TACode {

    private Address arg1;
    private Address arg2;
    private Address result;
    private String op;
    private TACodeTypes type;
    private String label = null;

    public TACode(TACodeTypes type, Address result, String op, Address arg1, Address arg2) {
        this.type = type;
        this.op = op;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.result = result;
    }

    public TACode(TACodeTypes type) {
        this.type = type;

    }

    public TACode(TACodeTypes type, Address arg1) {
        this.type = type;
        this.arg1 = arg1;
    }


    @Override
    public String toString() {
        switch (this.type) {
            case COPY:
                if(arg2 != null) {
                    return String.format("%s = %s %s %s",
                            result,
                            arg1,
                            op,
                            arg2
                    ) ;
                } else {
                    return String.format("%s = %s",
                            result,
                            arg1
                    ) ;
                }
            case IF_GOTO:
                return String.format("IF %s ELSE_GOTO %s", this.arg1, this.arg2.label);
            case GOTO:
                return String.format("GOTO %s", this.arg1.label);
            case LABEL:
                return String.format(this.result.label + ":");
            case RETURN:
                return "RETURN " + this.arg1.lexeme.getValue();
            case PARAM:
                return "PARAM" + this.arg1.lexeme.getValue();
            case CALL:
                return "CALL";

        }
        throw new NotImplementedException("Unkonw opcode type:" + this.type);


    }

    public Address getResult() {
        return result;
    }

    public void setArg1(Address addr) {
        this.arg1 = addr;
    }

    public Address getArg1() {
        return this.arg1;
    }

    public void setArg2(Address addr) {
        this.arg2 = addr;
    }

    public Address getArg2() {return this.arg2;}

    public void setResult(Address address) {
        this.result = address;

    }
}
