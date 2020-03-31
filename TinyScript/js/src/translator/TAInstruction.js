const TAInstructionType = require('./TAInstructionType')
class TAInstruction {

  constructor(type, result, op, arg1, arg2) {
    this.op = op
    this.type = type
    this.arg1 = arg1
    this.arg2 = arg2
    this.result = result
    this.label = null
  }

  toString() {
    switch (this.type) {
      case TAInstructionType.ASSIGN:
        if (this.arg2 != null) {
          return `${this.result} = ${this.arg1} ${this.op} ${this.arg2}`
        } else {
          return `${this.result} = ${this.arg1}`
        }
      case TAInstructionType.IF:
        return `IF ${this.arg1} ELSE ${this.arg2}`
      case TAInstructionType.GOTO:
        return `GOTO ${this.arg1}`
      case TAInstructionType.LABEL:
        return `${this.arg1}:`
      case TAInstructionType.RETURN:
        return `RETURN ${this.arg1}`
      case TAInstructionType.PARAM:
        return `PARAM ${this.arg1} ${this.arg2}`
      case TAInstructionType.SP:
        return `SP ${this.arg1}`;
      case TAInstructionType.CALL:
        return `CALL ${this.arg1}`

    }
    throw new Error("Unkonw opcode type:" + this.type);


  }

  getResult() {
    return this.result
  }

  setArg1(arg) {
    this.arg1 = arg
  }

  getArg1() {
    return this.arg1
  }

  setArg2(arg) {
    this.arg2 = arg
  }

  getArg2() { return this.arg2 }

  setResult(address) {
    this.result = address
  }

  getType() {
    return this.type
  }

  getOp() {
    return this.op
  }
}

module.exports = TAInstruction