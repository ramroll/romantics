package gen;

import org.apache.commons.lang3.StringUtils;
import translator.TAProgram;

import java.util.ArrayList;
import java.util.Hashtable;

public class OpCodeProgram {

    Integer entry = null;
    ArrayList<Instruction> instructions = new ArrayList<>();
    Hashtable<Integer, String> comments = new Hashtable<>();
    public void add(Instruction i) {
        this.instructions.add(i);
    }

    @Override
    public String toString() {
        ArrayList<String> prts = new ArrayList<>();
        for(int i = 0; i < instructions.size(); i++) {
            if(this.comments.containsKey(i)) {
                prts.add("#" + this.comments.get(i));
            }
            String str = instructions.get(i).toString();
            if(this.entry != null && i == this.entry) {
                str = "MAIN:" + str;
            }
            prts.add(str);
        }
        return StringUtils.join(prts, "\n");
    }

    public ArrayList<Integer> toByteCodes() {
        var codes = new ArrayList<Integer>();

        for(var instruction : instructions) {
            codes.add(instruction.toByteCode());
        }
        return codes;

    }

    public void setEntry(int entry) {
        this.entry = entry;
    }

    public void addComment(String comment) {
        this.comments.put(this.instructions.size(), comment);
    }

    public Integer getEntry() {
        return this.entry;

    }

    public ArrayList<Integer> getStaticArea(TAProgram taProgram) {
        var list = new ArrayList<Integer>();
        for(var symbol : taProgram.getStaticSymbolTable().getSymbols()) {
            list.add(Integer.parseInt(symbol.getLexeme().getValue()));
        }
        return list;
    }
}
