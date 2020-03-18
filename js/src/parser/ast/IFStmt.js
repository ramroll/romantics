const ASTNodeTypes = require("./ASTNodeTypes")
const {Stmt} = require('./index')
class IfStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.IF_STMT, "if");
  }

  
  getExpr() {
    return this.getChild(0);
  }

  getBlock() {
    return this.getChild(1);
  }

  getElseBlock() {
    var block = this.getChild(2);
    if (block instanceof Block) {
      return block;
    }
    return null;
  }

  getElseIfStmt() {
    var ifStmt = this.getChild(2);
    if (ifStmt instanceof IfStmt) {
      return ifStmt;
    }
    return null;
  }
}
module.exports = IfStmt

const {Expr, Block} = require('./index')

// IfStmt -> if(Expr) {Block} Tail
IfStmt.parse = (it) => {
  const lexeme = it.nextMatch("if");
  it.nextMatch("(");
  const ifStmt = new IfStmt();
  ifStmt.setLexeme(lexeme);
  const expr = Expr.parse(it);
  ifStmt.addChild(expr);
  it.nextMatch(")");
  const block = Block.parse(it);
  ifStmt.addChild(block);

  const tail = parseTail(it);
  if (tail != null) {
    ifStmt.addChild(tail);
  }
  return ifStmt;
}

// Tail -> else {Block} | else IFStmt | ε
IfStmt.parseTail = (it) => {
  if (
    !it.hasNext() ||
    !it
      .peek()
      .getValue()
      .equals("else")
  ) {
    return null;
  }
  it.nextMatch("else");
  const lookahead = it.peek();

  if (lookahead.getValue().equals("{")) {
    return Block.parse(it);
  } else if (lookahead.getValue().equals("if")) {
    return IfStmt.parse(it);
  } else {
    return null;
  }
}

