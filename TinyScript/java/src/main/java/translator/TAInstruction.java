package translator;

import org.apache.commons.lang3.NotImplementedException;
import org.apache.commons.lang3.StringUtils;
import translator.symbol.Symbol;

public class TAInstruction {

    private Object arg1;
    private Object arg2;
    private String op;
    private Symbol result;
    private TAInstructionType type;
    private String label = null;

    public TAInstruction(TAInstructionType type, Symbol result, String op, Object arg1, Object arg2) {
        this.op = op;
        this.type = type;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.result = result;
    }

    @Override
    public String toString() {
        switch (this.type) {
            case ASSIGN:
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
            case IF:
                return String.format("IF %s ELSE %s", this.arg1, this.arg2);
            case GOTO:
                return String.format("GOTO %s", this.arg1);
            case LABEL:
                return String.format(this.arg1 + ":");
            case FUNC_BEGIN:
                return "FUNC_BEGIN";
            case RETURN:
                return "RETURN " + this.arg1;
            case PARAM:
                return "PARAM " +  this.arg1 + " " + this.arg2;
            case SP:
                return "SP " + this.arg1;
            case CALL:
                return "CALL " + this.arg1;

        }
        throw new NotImplementedException("Unkonw opcode type:" + this.type);


    }

    public Symbol getResult() {
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

    public void setResult(Symbol address) {
        this.result = address;

    }

    public TAInstructionType getType() {
        return this.type;
    }

    public String getOp() {
        return this.op;
    }
}
