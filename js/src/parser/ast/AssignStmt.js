const ASTNodeTypes = require("./ASTNodeTypes");
const ParseException = require("../util/ParseException");
const {Stmt} = require('./index')
class AssignStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.ASSIGN_STMT, "assign");
  }
}

const { Factor, Expr } = require("./index");
AssignStmt.parse = it => {
  const stmt = new AssignStmt()
  const tkn = it.peek();
  const factor = Factor.parse(it);
  if (factor == null) {
    throw ParseException.fromToken(tkn);
  }
  stmt.addChild(factor);
  const lexeme = it.nextMatch("=");
  const expr = Expr.parse(it);
  stmt.addChild(expr);
  stmt.setLexeme(lexeme);
  return stmt;
};
module.exports = AssignStmt;
