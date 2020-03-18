/**
 * 异常处理
 */
class LexicalException extends Error {

    constructor(msg){
        super(msg)
    }

    static fromChar(c) {
        return new LexicalException(`unexpected char ${c}`)
    }
}

module.exports = LexicalException