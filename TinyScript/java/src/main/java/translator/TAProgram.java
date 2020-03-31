package translator;

import org.apache.commons.lang3.StringUtils;
import translator.symbol.StaticSymbolTable;
import translator.symbol.SymbolTable;
import translator.symbol.SymbolType;

import java.util.ArrayList;

public class TAProgram {

    private ArrayList<TAInstruction> instructions = new ArrayList<>();
    private int labelCounter = 0;
    private StaticSymbolTable staticSymbolTable = new StaticSymbolTable();

    public void add(TAInstruction code) {
        instructions.add(code);
    }
    public ArrayList<TAInstruction> getInstructions() {
        return instructions;
    }


    @Override
    public String toString() {
        var lines = new ArrayList<String>();
        for(var opcode : instructions) {
            lines.add(opcode.toString());
        }
        return StringUtils.join(lines, "\n");
    }

    public TAInstruction addLabel() {
        var label = "L" + labelCounter++;
        var taCode = new TAInstruction(TAInstructionType.LABEL, null, null, null, null);
        taCode.setArg1(label);
        instructions.add(taCode);
        return taCode;
    }


    public void setStaticSymbols(SymbolTable symbolTable) {
        for(var symbol : symbolTable.getSymbols()) {
            if(symbol.getType() == SymbolType.IMMEDIATE_SYMBOL) {
                staticSymbolTable.add(symbol);
            }
        }

        for(var child : symbolTable.getChildren()) {
            setStaticSymbols(child);
        }
    }

    public StaticSymbolTable getStaticSymbolTable(){
        return this.staticSymbolTable;
    }
}

