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
        if(!offsetMap.containsKey(lexval)) {
            offsetMap.put(lexval, symbol);
            symbol.setOffset(offsetCounter++);
            symbols.add(symbol);
        } else {
            var sameSymbol = offsetMap.get(lexval);
            symbol.setOffset(sameSymbol.offset);
        }
    }

    public int size(){
        return this.symbols.size();
    }
}
