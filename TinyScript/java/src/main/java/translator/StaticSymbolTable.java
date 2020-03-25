package translator;

import java.util.ArrayList;
import java.util.Hashtable;
public class StaticSymbolTable {

    private Hashtable<String, Symbol> offsetMap;
    private int offsetCounter = 0;
    private ArrayList<Symbol> symbols;


    public StaticSymbolTable(){
        symbols = new ArrayList<>();
        offsetMap = new Hashtable<>();
    }

    public void add(Symbol symbol){
        var lexval = symbol.getLexeme().getValue();
        if(!offsetMap.contains(lexval)) {
            offsetMap.put(lexval, symbol);
        } else {
        }


    }
}
