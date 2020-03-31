package translator.symbol;

import lexer.Token;

/**
 * 一个值或者变量的集合体
 */
public class Symbol {

    SymbolTable parent;
    Token lexeme;
    String label;
    int offset;
    int layerOffset = 0;
    SymbolType type;
    public Symbol(SymbolType type){
        this.type = type;
    }

    public static Symbol createAddressSymbol(Token lexeme, int offset){
        var symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
        symbol.lexeme = lexeme;
        symbol.offset = offset;
        return symbol;
    }

    public static Symbol createImmediateSymbol(Token lexeme){
        var symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL);
        symbol.lexeme = lexeme;
        return symbol;
    }

    public static Symbol createLabelSymbol(String label, Token lexeme) {
        var symbol = new Symbol(SymbolType.LABEL_SYMBOL);
        symbol.label = label;
        symbol.lexeme = lexeme;
        return symbol;
    }


    public Symbol copy() {
        var symbol = new Symbol(this.type);
        symbol.lexeme = this.lexeme;
        symbol.label = this.label;
        symbol.offset = this.offset;
        symbol.layerOffset = this.layerOffset;
        symbol.type = this.type;
        return symbol;
    }

    public void setParent(SymbolTable parent) {
        this.parent = parent;
    }

    public void setOffset(int offset){
        this.offset = offset;
    }

    public SymbolType getType(){
        return this.type;
    }

    @Override
    public String toString() {
        if(this.type == SymbolType.LABEL_SYMBOL){
            return this.label;
        }
        return lexeme.getValue();
    }

    public void setLexeme(Token lexeme) {
        this.lexeme = lexeme;
    }

    public int getOffset() {
        return this.offset;
    }

    public Token getLexeme() {
        return this.lexeme;
    }

    public void setLayerOffset(int offset) {
        this.layerOffset = offset;
    }

    public int getLayerOffset(){
        return this.layerOffset;
    }

    public String getLabel() {
        return this.label;
    }
}
