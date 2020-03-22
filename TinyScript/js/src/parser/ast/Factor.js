const TokenType = require("../../lexer/TokenType");
const ASTNode = require('./ASTNode')
class Factor extends ASTNode {
  constructor(token) {
    super();
    this.lexeme = token;
    this.label = token.getValue();
  }
}
module.exports = Factor;

const { Variable, Scalar} = require("./index");
Factor.parse = it => {
  const token = it.peek();
  const type = token.getType();

  if (type == TokenType.VARIABLE) {
    it.next();
    return new Variable(token);
  } else if (token.isScalar()) {
    it.next();
    return new Scalar(token);
  }
  return null;
};

