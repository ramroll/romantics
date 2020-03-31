const ASTNodeTypes = require('./ASTNodeTypes')
class ASTNode {
    constructor(_type = null, _label = null){
        /* 树结构 */
        this.children = []
        this.parent = null 

        /* 关键信息 */
        this.lexeme = null
        this.type = _type 
        this.label = _label

        /* 属性 */
        this._props = {}
    }

    getChild(index) {
        if(!this.children[index]) {return null}
        return this.children[index]
    }

    addChild(node) {
        node.parent = this
        this.children.push(node)
    }

    getLabel(){
        return this.label
    }

    getLexeme(){
        return this.lexeme
    }

    getType(){
        return this.type
    }


    setLexeme(lexeme) {
        this.lexeme = lexeme
    }


    getChildren(){
        return this.children
    }

    isValueType() {
        return this.type == ASTNodeTypes.VARIABLE || this.type == ASTNodeTypes.SCALAR
    }

    print(indent = 0) {
        console.log(`${"".padStart(indent * 2, " ")}${this.label}`)
        this.children.forEach(x => x.print(indent + 1))
    }

    setProp(key, value) {
        this._props[key] = value
    }
    getProp(key) {
        if(this._props[key] === undefined) {
            return null
        }
        return this._props[key]
    }




}

module.exports = ASTNode