package translator;

import lexer.Token;

/**
 * 一个值或者变量的集合体
 */
public class Symbol {

    SymbolTable parent;
    Token lexeme;
    String label;
    int offset;
    SymbolType type;
    public Symbol(SymbolType type){
        this.type = type;
    }

    static Symbol createAddressSymbol(Token lexeme, int offset){
        var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
        symbol.lexeme = lexeme;
        symbol.offset = offset;
        return symbol;
    }

    static Symbol createImmediateSymbol(Token lexeme){
        var symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL);
        symbol.lexeme = lexeme;
        return symbol;
    }

    static Symbol createLabelSymbol(String label, Token lexeme) {
        var symbol = new Symbol(SymbolType.LABEL_SYMBOL);
        symbol.lexeme = lexeme;
        return symbol;
    }

    public void setParent(SymbolTable parent) {
        this.parent = parent;
    }

    public void setOffset(int offset){
        this.offset = offset;
    }

    @Override
    public String toString() {
        return lexeme.getValue();
    }

    public void setLexeme(Token lexeme) {
        this.lexeme = lexeme;
    }
}
