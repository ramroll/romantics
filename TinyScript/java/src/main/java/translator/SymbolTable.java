package translator;

import lexer.Token;
import lexer.TokenType;

import java.util.ArrayList;
import java.util.List;

public class SymbolTable {
    private SymbolTable parent = null;
    private List<SymbolTable> children;
    private List<TAValue> symbols;
    private int tempIndex = 0;


    public SymbolTable(){
        this.children = new ArrayList<>();
        this.symbols = new ArrayList<>();
    }

    public void addSymbol(TAValue addr) {
        this.symbols.add(addr);
        addr.setParent(this);
        addr.setOffset(this.symbols.size() - 1);
    }

    public TAValue findSymbolByLexeme(Token lexeme) {
        var symbol = this.symbols.stream().filter(x -> x.lexeme.getValue().equals(lexeme.getValue())).findFirst();
        if(!symbol.isEmpty()) {
            return symbol.get();
        }
        if(this.parent != null) {
            return this.parent.findSymbolByLexeme(lexeme);
        }
        return null;
    }

    public TAValue createAddressByLexeme(Token lexeme) {
        TAValue addr = null;
        if(lexeme.isScalar()) {
            addr = new TAValue(lexeme);
        } else {
            addr = findSymbolByLexeme(lexeme);
            if(addr == null) {
                addr = new TAValue(lexeme);
            }
            this.addSymbol(addr);
        }
        return addr;
    }

    public TAValue createVariable() {
        var lexeme = new Token(TokenType.VARIABLE, "p" + this.tempIndex ++);
        var addr = new TAValue(lexeme);
        this.addSymbol(addr);
        return addr;
    }

    public void addChild(SymbolTable child) {
        child.parent = this;
        this.children.add(child);
    }

    public TAValue getSymbol(int i) {
        return this.symbols.get(0);
    }

    public int size() {
        return this.symbols.size();
    }
}
