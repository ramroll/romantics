const Lexer = require('../lexer/Lexer')
const PeekIterator = require('../common/PeekIterator')
const arrayToGenerator = require('../common/arrayToGenerator')
const Program = require('../parser/ast/Program')
const PeekTokenIterator = require('../parser/util/PeekTokenIterator')
class Parser {

    static parse(source) {
        const lexer = new Lexer()
        const  tokens = lexer.analyse(arrayToGenerator([...source]))
        return Program.parse(new PeekTokenIterator(arrayToGenerator(tokens)))
    }

    static fromFile(file) {
        var tokens = Lexer.fromFile(file)
        return Program.parse(new PeekTokenIterator(tokens))
    }
}


module.exports = Parser