class Enum {

    constructor(type, value){
        this.type = type
        this.value = value
    }

    toString(){
        return this.type;
    }
}

module.exports = Enum