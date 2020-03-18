package translator;

import lexer.Token;
import lexer.TokenType;

import java.util.ArrayList;
import java.util.List;

public class SymbolTable {
    private SymbolTable parent = null;
    private List<SymbolTable> children;
    private List<Address> symbols;
    private int tempIndex = 0;


    public SymbolTable(){
        this.children = new ArrayList<>();
        this.symbols = new ArrayList<>();
    }

    public void addSymbol(Address addr) {
        this.symbols.add(addr);
        addr.setParent(this);
        addr.setOffset(this.symbols.size() - 1);
    }

    public Address findSymbolByLexeme(Token lexeme) {
        var symbol = this.symbols.stream().filter(x -> x.lexeme.getValue() == lexeme.getValue()).findFirst();
        if(!symbol.isEmpty()) {
            return symbol.get();
        }
        if(this.parent != null) {
            return this.parent.findSymbolByLexeme(lexeme);
        }
        return null;
    }

    public Address createAddressByLexeme(Token lexeme) {
        Address addr = null;
        if(lexeme.isScalar()) {
            addr = new Address(lexeme);
        } else {
            addr = findSymbolByLexeme(lexeme);
            if(addr == null) {
                addr = new Address(lexeme);
            }
            this.addSymbol(addr);
        }
        return addr;
    }

    public Address createVariable() {
        var lexeme = new Token(TokenType.VARIABLE, "p" + this.tempIndex ++);
        var addr = new Address(lexeme);
        this.addSymbol(addr);
        return addr;
    }

    public void addChild(SymbolTable child) {
        child.parent = this;
        this.children.add(child);
    }
}
