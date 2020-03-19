package translator;

import org.apache.commons.lang3.NotImplementedException;
import parser.ast.ASTNode;
import parser.ast.AssignStmt;
import parser.ast.Block;
import parser.ast.IfStmt;
import parser.util.ParseException;

public class Translator {

    public TAProgram translate(ASTNode program) {
        var threeAddressProgram = new TAProgram();
        var symbolTable = new SymbolTable();

        for(var child : program.getChildren()) {
            translateStmt(threeAddressProgram, child, symbolTable);
        }
        return threeAddressProgram;
    }

    public void translateStmt(TAProgram program, ASTNode node, SymbolTable symbolTable) {
        switch (node.getType()) {
            case IF_STMT:
                translateIfStmt(program, (IfStmt)node, symbolTable);
                break;
            case ASSIGN_STMT:
                translateAssignStmt(program, node, symbolTable);
                break;
            case DECLARE_STMT:
                translateDeclareStmt(program, node, symbolTable);
                break;
        }
        throw new NotImplementedException("Translator not impl. for " + node.getType());
    }

    private void translateDeclareStmt(TAProgram program, ASTNode node, SymbolTable symbolTable) throws ParseException {
        var lexeme = node.getChild(0).getLexeme();
        if(symbolTable.findSymbolByLexeme(lexeme) != null) {
            throw new ParseException("Syntax Error, Identifier " + lexeme.getValue() + " is already defined.");
        }
        var assigned = symbolTable.createAddressByLexeme(node.getChild(0).getLexeme());
        var expr = node.getChild(1);
        translateExpr(program, expr, symbolTable);
        program.add(new TACode(TACodeTypes.COPY, assigned, "=", program.lastOpCode().getResult(), null));
    }

    private void translateAssignStmt(TAProgram program, ASTNode node, SymbolTable symbolTable) {
        var assigned = symbolTable.createAddressByLexeme(node.getChild(0).getLexeme());
        var expr = node.getChild(1);
        translateExpr(program, expr, symbolTable);
        program.add(new TACode(TACodeTypes.COPY, assigned, "=", program.lastOpCode().getResult(), null));

    }

    public  void translateBlock(TAProgram program, Block block, SymbolTable parent) {
        var symbolTable = new SymbolTable();
        parent.addChild(symbolTable);
        for(var child : block.getChildren()) {
            translateStmt(program, child, symbolTable);
        }
    }

    public void translateIfStmt(TAProgram program, IfStmt node, SymbolTable symbolTable) {
        var expr = node.getExpr();
        translateExpr(program, expr, symbolTable);
        var ifOpCode = program.createIfCode(program.lastOpCode().getResult());
        translateBlock(program, (Block)node.getBlock(), symbolTable);
        ifOpCode.setLabel(program.createLabel());

        if(node.getElseBlock() != null) {
            translateBlock(program, (Block)node.getElseBlock(), symbolTable);
            ifOpCode.setLabel(program.createLabel());
        } else if(node.getElseIfStmt() != null) {
            translateIfStmt(program, (IfStmt) node.getElseIfStmt(), symbolTable);
            ifOpCode.setLabel(program.createLabel());
        }
    }



    /**
     * Expr -> Expr1 op Expr2
     *  T: result = Expr1.addr op Expr2.addr
     * Expr1 -> Factor
     *  T: Expr1.addr = symbolTable.find(factor)
     */
    public void translateExpr(
            TAProgram program,
            ASTNode node,
            SymbolTable symbolTable) {

        if(node.isValueType()) {
            node.setProp("addr", symbolTable.createAddressByLexeme(node.getLexeme()));
        }
        else {
            for(var child : node.getChildren()) {
                translateExpr(program,child, symbolTable);
            }
            if(node.getProp("addr") == null) {
                node.setProp("addr", symbolTable.createVariable());
            }
            program.add(new TACode(
                    TACodeTypes.COPY,
                    (Address)(node.getProp("addr")),
                    node.getLexeme().getValue(),
                    (Address)(node.getChild(0).getProp("addr")),
                    (Address)(node.getChild(1).getProp("addr"))
            ));
        }
    }
}
