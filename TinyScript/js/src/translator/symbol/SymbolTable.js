const Token = require('../../lexer/Token')
const TokenType = require('../../lexer/TokenType')
const Symbol = require('./Symbol')

class SymbolTable {

    constructor(){
      this.parent = null
        this.children = []
        this.symbols = [] 
        this.tempIndex = 0
        this.offsetIndex = 0
        this.level = 0
    }

    addSymbol(symbol) {
        this.symbols.push(symbol)
        symbol.setParent(this)
    }

    cloneFromSymbolTree(lexeme, layerOffset) {

        let symbol = this.symbols
                .find(x => x.lexeme.getValue() == lexeme.getValue())
        if(symbol) {
            symbol = symbol.copy()
            symbol.setLayerOffset(layerOffset)
            return symbol
        }
        if(this.parent != null) {
            return this.parent.cloneFromSymbolTree(lexeme, layerOffset + 1)
        }
        return null
    }

    exists(lexeme) {
      let symbol = this.symbols
                .find(x => x.lexeme.getValue() == lexeme.getValue())

        if(symbol) {
            return true
        }
        if(this.parent != null) {
            return this.parent.exists(lexeme)
        }
        return false;
    }

    createSymbolByLexeme(lexeme) {
        let symbol = null
        if(lexeme.isScalar()) {
            symbol = Symbol.createImmediateSymbol(lexeme)
        } else {
            symbol = this.cloneFromSymbolTree(lexeme, 0)
            if(symbol == null) {
                symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
            }
        }
        this.addSymbol(symbol)
        return symbol
    }

    createVariable() {
        var lexeme = new Token(TokenType.VARIABLE, "p" + this.tempIndex ++)
        var symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
        this.addSymbol(symbol)
        return symbol
    }

    addChild(child) {
        child.parent = this
        child.level = this.level + 1
        this.children.push(child)
    }

    localSize() {
        return this.offsetIndex
    }

    getSymbols(){
        return this.symbols
    }

    getChildren(){
        return this.children
    }


    createLabel(label, lexeme) {
        var labelSymbol = Symbol.createLabelSymbol(label, lexeme)
        this.addSymbol(labelSymbol)

    }
}

module.exports = SymbolTable