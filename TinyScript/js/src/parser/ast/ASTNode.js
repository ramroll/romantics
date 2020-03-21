class ASTNode {
    constructor(_type = null, _label = null){
        /* 树结构 */
        this.children = []
        this.parent = null 

        /* 关键信息 */
        this.lexeme = null
        this.type = _type 
        this.label = _label
    }

    getChild(index) {
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

    setLexeme(lexeme) {
        this.lexeme = lexeme
    }


    getChildren(){
        return this.children
    }

    print(indent = 0) {
        console.log(`${"".padStart(indent * 2, " ")}${this.label}`)
        this.children.forEach(x => x.print(indent + 1))
    }

}

module.exports = ASTNode