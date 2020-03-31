class StaticSymbolTable {

    constructor(){
        this.symbols = []
        this.offsetMap = new Map() 
        this.offsetCounter = 0
    }

    add(symbol){
        var lexval = symbol.getLexeme().getValue()
        if(!this.offsetMap.has(lexval)) {
            this.offsetMap.set(lexval, symbol)
            symbol.setOffset(this.offsetCounter++)
            this.symbols.push(symbol)
        } else {
            var sameSymbol = this.offsetMap.get(lexval)
            symbol.setOffset(sameSymbol.offset)
        }
    }

    size(){
        return this.symbols.size()
    }
}

module.exports = StaticSymbolTable