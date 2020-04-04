const TAProgram = require('./TAProgram')
const SymbolTable = require('./symbol/SymbolTable')
const Token = require('../lexer/Token')
const TokenType = require('../lexer/TokenType')
const ParseException = require('../parser/util/ParseException')
const Expr = require('../parser/ast/Expr')
const TAInstruction = require('../translator/TAInstruction')
const TAInstructionType = require('../translator/TAInstructionType')
const ASTNodeTypes = require('../parser/ast/ASTNodeTypes')

class Translator {

  translate(astNode) {
    const program = new TAProgram()
    const symbolTable = new SymbolTable()
    for (const child of astNode.getChildren()) {
      this.translateStmt(program, child, symbolTable)
    }
    program.setStaticSymbols(symbolTable)
    return program
  }


  translateStmt(program, node, symbolTable) {
    switch (node.getType()) {
      case ASTNodeTypes.ASSIGN_STMT:
        this.translateAssignStmt(program, node, symbolTable);
        return;
      case ASTNodeTypes.DECLARE_STMT:
        this.translateDeclareStmt(program, node, symbolTable);
        return;
      case ASTNodeTypes.BLOCK:
        this.translateBlock(program, node, symbolTable);
        return;
      case ASTNodeTypes.IF_STMT:
        this.translateIfStmt(program, node, symbolTable);
        return;
      case ASTNodeTypes.FUNCTION_DECLARE_STMT:
        this.translateFunctionDeclareStmt(program, node, symbolTable);
        return;
      case ASTNodeTypes.RETURN_STMT:
        this.translateReturnStmt(program, node, symbolTable);
        return;
      case ASTNodeTypes.CALL_EXPR:
        this.translateCallExpr(program, node, symbolTable);
        return;
    }
    throw new Error("Translator not impl. for " + node.getType())
  }

  translateFunctionDeclareStmt(program, node, parent) {
    const label = program.addLabel()
    const symbolTable = new SymbolTable()
    label.setArg2(node.getLexeme().getValue())

    const args = node.getArgs()
    parent.addChild(symbolTable)

    symbolTable.createLabel(label.getArg1(), node.getLexeme())

    for(const arg of args.getChildren()) {
      symbolTable.createSymbolByLexeme(arg.getLexeme())
    }

    for(const child of node.getBlock().getChildren()) {
      this.translateStmt(program, child, symbolTable)
    }

  }

  translateCallExpr(program, node, symbolTable) {
    // print()
    const factor = node.getChild(0)
    const returnValue = symbolTable.createVariable()
    symbolTable.createVariable()

    for(let i = 1; i < node.getChildren().length; i++) {
      const expr = node.getChild(i)
      const addr = this.translateExpr(program, expr, symbolTable)
      program.add(new TAInstruction(TAInstructionType.PARAM, null ,null, addr, i-1))
    }
    const funcAddr = symbolTable.cloneFromSymbolTree(factor.getLexeme(), 0)
    program.add(new TAInstruction(TAInstructionType.SP, null ,null, -symbolTable.localSize(), null))
    program.add(new TAInstruction(TAInstructionType.CALL, null, null, funcAddr, null))
    program.add(new TAInstruction(TAInstructionType.SP, null ,null, symbolTable.localSize(), null))
    return returnValue
  }

  translateReturnStmt(program, node, symbolTable) {
    const resultValue = this.translateExpr(program, node.getChild(0), symbolTable)
    program.add(new TAInstruction(TAInstructionType.RETURN, null, null, resultValue, null))
  }

  translateBlock(program, node, parent) {
    const symbolTable = new SymbolTable()
    parent.addChild(symbolTable)


    const parentOffset = symbolTable.createVariable()
    parentOffset.setLexeme(new Token(TokenType.INTEGER, parent.localSize() + ""))


    program.add(new TAInstruction(
      TAInstructionType.SP,
      null,
      null,
      -parent.localSize(),
      null
    ))

    for(const child of node.getChildren()) {
      this.translateStmt(program, child, symbolTable)
    }

    program.add(new TAInstruction(
      TAInstructionType.SP,
      null,
      null,
      parent.localSize(),
      null
    ))
  }


  translateIfStmt(program, node, symbolTable){
    const expr = node.getExpr()
    const exprAddr = this.translateExpr(program, expr, symbolTable)
    const ifInstruction = new TAInstruction(TAInstructionType.IF, 
      null, null, exprAddr, null
    )

    program.add(ifInstruction)

    this.translateBlock(program, node.getBlock(), symbolTable)


    let gotoInstruction = null
    if(node.getChild(2)) {
      gotoInstruction = new TAInstruction(TAInstructionType.GOTO, 
        null, null, null, null
        )
      program.add(gotoInstruction)
      const labelEndIf = program.addLabel()
      ifInstruction.setArg2(labelEndIf.getArg1())
    }

    if(node.getElseBlock()) {
      this.translateBlock(program, node.getElseBlock(), symbolTable)
    } else if(node.getElseIfStmt()) {
      this.translateIfStmt(program, node.getElseIfStmt(), symbolTable)
    }

    // if(expr) {... GOTO } else {...}
    const labelEnd = program.addLabel()

    if(node.getChild(2)) {
      gotoInstruction.setArg1(labelEnd.getArg1())
    } else {
      ifInstruction.setArg2(labelEnd.getArg1())
    }



  }

  translateDeclareStmt(program, node, symbolTable) {
    const lexeme = node.getChild(0).getLexeme()
    if (symbolTable.exists(lexeme)) {
      throw new ParseException("Syntax Error, Identifier " + lexeme.getValue() + " is already defined.")
    }
    const assigned = symbolTable.createSymbolByLexeme(node.getChild(0).getLexeme())
    const expr = node.getChild(1)
    const addr = this.translateExpr(program, expr, symbolTable)
    program.add(new TAInstruction(TAInstructionType.ASSIGN, assigned, "=", addr, null))
  }

  translateAssignStmt(program, node, symbolTable) {
    const assigned = symbolTable.createSymbolByLexeme(node.getChild(0).getLexeme())
    const expr = node.getChild(1)
    const addr = this.translateExpr(program, expr, symbolTable)
    program.add(new TAInstruction(TAInstructionType.ASSIGN, assigned, "=", addr, null))
  }


  /**
   * Expr -> Expr1 op Expr2
   *  T: result = Expr1.addr op Expr2.addr
   * Expr1 -> Factor
   *  T: Expr1.addr = symbolTable.find(factor)
   */
  translateExpr(
    program,
    node,
    symbolTable) {

    if (node.isValueType()) {
      const addr = symbolTable.createSymbolByLexeme(node.getLexeme())
      node.setProp("addr", addr)
      return addr
    }
    else if (node.getType() == ASTNodeTypes.CALL_EXPR) {
      const addr = this.translateCallExpr(program, node, symbolTable)
      node.setProp("addr", addr)
      return addr
    }
    else if (node instanceof Expr) {
      for (const child of node.getChildren()) {
        this.translateExpr(program, child, symbolTable)
      }
      if (node.getProp("addr") == null) {
        node.setProp("addr", symbolTable.createVariable())
      }
      const instruction = new TAInstruction(
        TAInstructionType.ASSIGN,
        node.getProp("addr"),
        node.getLexeme().getValue(),
        node.getChild(0).getProp("addr"),
        node.getChild(1).getProp("addr")
      )
      program.add(instruction)
      return instruction.getResult()
    }
    throw new Error("Unexpected node type :" + node.getType());
  }


}

module.exports = Translator