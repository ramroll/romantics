package translator;

import lexer.Token;
import lexer.TokenType;

public class Address {


    SymbolTable parent;
    int offset;

    Token lexeme;

    public Address(Token lexeme) {
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
}
