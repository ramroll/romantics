const Lexer = require("../lexer/Lexer");
const arrayToGenerator = require("../common/arrayToGenerator");
const PeekTokenIterator = require("../parser/util/PeekTokenIterator");
const DeclareStmt = require("../parser/ast/DeclareStmt");
const AssignStmt = require("../parser/ast/AssignStmt");
const ParserUtils = require("../parser/util/ParserUtils");
const IfStmt = require("../parser/ast/IFStmt")
const { assert } = require("chai");
describe("Stmts", () => {
  it("declare", () => {
    const it = createTokenIt("var i = 100 * 2");
    const stmt = DeclareStmt.parse(it);
    assert.equal("i 100 2 * =", ParserUtils.toPostfixExpression(stmt));
  });

  it("assign", () => {
    const it = createTokenIt("i = 100 * 2");
    const stmt = AssignStmt.parse(it);
    assert.equal("i 100 2 * =", ParserUtils.toPostfixExpression(stmt));
  });

  it("ifStmt", () => {
    const it = createTokenIt(`if(a){
      a = 1
    }`);

    const stmt = IfStmt.parse(it) 
    const expr = stmt.getExpr();
    const block = stmt.getBlock();
    const assignStmt = block.getChild(0);

    assert.equal(expr.getLexeme().getValue(), "a")
    assert.equal(assignStmt.getLexeme().getValue(), "=")

  });
});

function createTokenIt(src) {
  const lexer = new Lexer();
  const tokens = lexer.analyse(arrayToGenerator([...src]));
  const tokenIt = new PeekTokenIterator(arrayToGenerator(tokens));
  return tokenIt;
}
