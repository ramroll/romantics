package translator;

import org.apache.commons.lang3.NotImplementedException;

public class TAInstruction {

    private Object arg1;
    private Object arg2;
    private String op;
    private TAValue result;
    private TAOpCodeType type;
    private String label = null;

    public TAInstruction(TAOpCodeType type, TAValue result, String op, Object arg1, Object arg2) {
        this.op = op;
        this.type = type;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.result = result;
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
                return String.format("IF %s ELSE_GOTO %s", this.arg1, this.arg2);
            case GOTO:
                return String.format("GOTO %s", (String)this.arg1);
            case LABEL:
                return String.format(this.arg1 + ":");
            case RETURN:
                return "RETURN " + ((TAValue)this.arg1).lexeme.getValue();
            case PARAM:
                return "PARAM " + ((TAValue)this.arg1).lexeme.getValue();
            case CALL:
                return "CALL " + ((TAValue)this.arg1).label;

        }
        throw new NotImplementedException("Unkonw opcode type:" + this.type);


    }

    public TAValue getResult() {
        return result;
    }

    public void setArg1(Object arg) {
        this.arg1 = arg;
    }

    public Object getArg1() {
        return this.arg1;
    }

    public void setArg2(Object arg) {
        this.arg2 = arg;
    }

    public Object getArg2() {return this.arg2;}

    public void setResult(TAValue address) {
        this.result = address;

    }
}
