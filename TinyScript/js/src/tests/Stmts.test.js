const Lexer = require("../lexer/Lexer");
const arrayToGenerator = require("../common/arrayToGenerator");
const PeekTokenIterator = require("../parser/util/PeekTokenIterator");
const ParserUtils = require("../parser/util/ParserUtils");
const path = require('path')
const { assert } = require("chai");
const {DeclareStmt, AssignStmt, IfStmt, Stmt, ReturnStmt} = require("../parser/ast/index")
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
      var a = 1
    }`);

    const stmt = IfStmt.parse(it) 
    const expr = stmt.getExpr();
    const block = stmt.getBlock();
    const assignStmt = block.getChild(0);
    const elseBlock = stmt.getChild(2)

    assert.equal(expr.getLexeme().getValue(), "a")
    assert.equal(assignStmt.getLexeme().getValue(), "=")
    assert.equal(null, elseBlock)

  })

  it("ifElse", () => {
    const it = createTokenIt(`if(a){
      a = 1
    } else {
      a = 2
      a = a * 3
    }`)

    const stmt = IfStmt.parse(it)
    const expr = stmt.getExpr()
    const block = stmt.getBlock()
    const assignStmt = block.getChild(0)
    const elseBlock = stmt.getChild(2)
    const assignStmt2 = elseBlock.getChild(0)

    assert.equal(expr.getLexeme().getValue(), "a")
    assert.equal(assignStmt.getLexeme().getValue(), "=")
    assert.equal(assignStmt2.getLexeme().getValue(), "=")
    assert.equal(elseBlock.getChildren().length, 2)


  })

  it("function", () => {
    const it = Lexer.fromFile(path.resolve(__dirname, "../../example/function.ts"))
    const functionStmt = Stmt.parse(new PeekTokenIterator(it))

    const args = functionStmt.getArgs()

    assert.equal(args.getChild(0).getLexeme().getValue(), 'a')
    assert.equal(args.getChild(1).getLexeme().getValue(), 'b')

    const type = functionStmt.getFuncType()
    assert.equal(type, "int")

    const functionVariable = functionStmt.getFunctionVariable()
    assert.equal(functionVariable.getLexeme().getValue(), "add")

    const block = functionStmt.getBlock()
    assert.equal(block.getChild(0) instanceof ReturnStmt, true)

  })

  it("function1", () => {
    const it = Lexer.fromFile(path.resolve(__dirname, "../../example/recursion.ts"))
    const functionStmt = Stmt.parse(new PeekTokenIterator(it))

    assert.equal(ParserUtils.toBFSString(functionStmt, 4), "func fact args block")
    assert.equal(ParserUtils.toBFSString(functionStmt.getArgs(), 2), "args n")
    assert.equal(ParserUtils.toBFSString(functionStmt.getBlock(), 3), "block if return")

  })

})

function createTokenIt(src) {
  const lexer = new Lexer();
  const tokens = lexer.analyse(arrayToGenerator([...src]));
  const tokenIt = new PeekTokenIterator(arrayToGenerator(tokens));
  return tokenIt;
}
