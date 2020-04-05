package translator.symbol;

import lexer.Token;
import lexer.TokenType;

import java.util.ArrayList;

public class SymbolTable {
    private SymbolTable parent = null;
    private ArrayList<SymbolTable> children;
    private ArrayList<Symbol> symbols;
    private int tempIndex = 0;
    private int offsetIndex = 0;
    private int level = 0;

    public SymbolTable(){
        this.children = new ArrayList<>();
        this.symbols = new ArrayList<>();
    }

    public void addSymbol(Symbol symbol) {
        this.symbols.add(symbol);
        symbol.setParent(this);
    }

    public Symbol cloneFromSymbolTree(Token lexeme, int layerOffset) {

        var _symbol = this.symbols.stream()
                .filter(x -> x.lexeme.getValue().equals(lexeme.getValue()))
                .findFirst();
        if(!_symbol.isEmpty()) {

            var symbol = _symbol.get().copy();
            symbol.setLayerOffset(layerOffset);
            return symbol;
        }
        if(this.parent != null) {
            return this.parent.cloneFromSymbolTree(lexeme, layerOffset + 1);
        }
        return null;
    }

    public boolean exists(Token lexeme) {
        var _symbol = this.symbols.stream().filter(x -> x.lexeme.getValue().equals(lexeme.getValue())).findFirst();
        if(!_symbol.isEmpty()) {
            return true;
        }
        if(this.parent != null) {
            return this.parent.exists(lexeme);
        }
        return false;
    }

    public Symbol createSymbolByLexeme(Token lexeme) {
        Symbol symbol = null;
        if(lexeme.isScalar()) {
            symbol = Symbol.createImmediateSymbol(lexeme);
            this.addSymbol(symbol);
        } else {
            var _symbol = this.symbols.stream().filter(x -> x.getLexeme().getValue().equals(lexeme.getValue())).findFirst();
            if (_symbol.isEmpty()) {
                symbol = cloneFromSymbolTree(lexeme, 0);
                if(symbol == null) {
                    symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++);
                }
                this.addSymbol(symbol);
            } else {
                symbol = _symbol.get();
            }

        }
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
        child.level = this.level + 1;
        this.children.add(child);
    }

    public int localSize() {
        return this.offsetIndex;
    }

    public ArrayList<Symbol> getSymbols(){
        return this.symbols;
    }

    public ArrayList<SymbolTable> getChildren(){
        return this.children;
    }


    public void createLabel(String label, Token lexeme) {
        var labelSymbol = Symbol.createLabelSymbol(label, lexeme);
        this.addSymbol(labelSymbol);

    }
}
