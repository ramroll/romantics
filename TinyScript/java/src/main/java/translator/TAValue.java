package translator;

import lexer.Token;

/**
 * 一个值或者变量的集合体
 */
public class TAValue {

    SymbolTable parent;
    int offset;
    Token lexeme;
    String label;
    public TAValue(){}

    public TAValue(Token lexeme) {
        this.lexeme = lexeme;
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
