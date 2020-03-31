const Enum = require('../common/Enum')
module.exports = {
  ASSIGN: new Enum("ASSIGN", 1),
  GOTO: new Enum("GOTO", 2),
  IF: new Enum("IF", 3),
  LABEL: new Enum("LABEL", 4),
  CALL: new Enum("CALL", 5),
  RETURN: new Enum("RETURN", 6),
  SP: new Enum("SP", 7),
  PARAM: new Enum("PARAM", 8)
}