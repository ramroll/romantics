package translator;

import lexer.Token;

public class Address {


    SymbolTable parent;
    int offset;
    Token lexeme;
    String label;
    int value;
    public Address(){}

    public Address(Token lexeme) {
        this.lexeme = lexeme;
    }

    public Address(String label) {
        this.label = label;
    }

    public static Object fromValue(int value) {
        var addr = new Address();
        addr.value = value;
        return addr;
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
