package translator;

public class TACode {

    private Address arg1;
    private Address arg2;
    private Address result;
    private String op;
    private TACodeTypes type;
    private String label;

    public TACode(TACodeTypes type, Address result, String op, Address arg1, Address arg2) {
        this.op = op;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.result = result;
    }

    public TACode(TACodeTypes type) {
        this.type = type;

    }

    @Override
    public String toString() {
        return String.format("%s = %s %s %s",
                result,
                arg1,
                op,
                arg2
                ) ;
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

    public void setLabel(String label) {
        this.label = label;
    }
}
