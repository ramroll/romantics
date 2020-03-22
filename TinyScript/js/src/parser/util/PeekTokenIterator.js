const PeekIterator = require('../../common/PeekIterator')
const ParseException = require('./ParseException')

class PeekTokenIterator extends PeekIterator{
    constructor(it) {
        super(it)
    }

    nextMatch(value) {
        const token = this.next()
        if(token.getValue() !== value) {
            throw ParseException.fromToken(token)
        }
        return token
    }

    nextMatch1(type) {
        const token = this.next()
        if(token.getType() !== type) {
            throw ParseException.fromToken(token)
        }
        return token
    }
}

module.exports = PeekTokenIterator