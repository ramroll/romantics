package translator;

import lexer.Token;
import lexer.TokenType;

import java.util.ArrayList;
import java.util.List;

public class SymbolTable {
    private SymbolTable parent = null;
    private List<SymbolTable> children;
    private List<Symbol> symbols;
    private int tempIndex = 0;
    private int offsetIndex = 0;

    public SymbolTable(){
        this.children = new ArrayList<>();
        this.symbols = new ArrayList<>();
    }

    public void addSymbol(Symbol symbol) {
        this.symbols.add(symbol);
        symbol.setParent(this);
    }

    public Symbol findSymbolByLexeme(Token lexeme) {
        var symbol = this.symbols.stream().filter(x -> x.lexeme.getValue().equals(lexeme.getValue())).findFirst();
        if(!symbol.isEmpty()) {
            return symbol.get();
        }
        if(this.parent != null) {
            return this.parent.findSymbolByLexeme(lexeme);
        }
        return null;
    }

    public Symbol createSymbolByLexeme(Token lexeme) {
        Symbol symbol = null;
        if(lexeme.isScalar()) {
            symbol = Symbol.createImmediateSymbol(lexeme);
        } else {
            symbol = findSymbolByLexeme(lexeme);
            if(symbol == null) {
                symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++);
            }
        }
        this.addSymbol(symbol);
        return symbol;
    }

    public Symbol createVariable() {
        var lexeme = new Token(TokenType.VARIABLE, "p" + this.tempIndex ++);
        var symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++);
        this.addSymbol(symbol);
        return symbol;
    }

    public void addChild(SymbolTable child) {
        child.parent = this;
        this.children.add(child);
    }

    public int size() {
        return this.symbols.size();
    }
}
