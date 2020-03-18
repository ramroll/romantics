package translator;

import parser.ast.ASTNode;
import parser.ast.Block;
import parser.ast.IfStmt;

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
                translateStmt(program, node, symbolTable);
                break;
        }
    }

    public  void translateBlock(TAProgram program, Block block, SymbolTable parent) {

    }

    public void translateIfStmt(TAProgram program, IfStmt node, SymbolTable symbolTable) {
        var expr = node.getExpr();
        translateBinaryExpr(program, expr, symbolTable);
        var ifOpCode = program.createIfCode();
        var label = program.addLabel();
        translateBlock(program, (Block)node.getBlock(), symbolTable);
    }



    /**
     * Expr -> Expr1 op Expr2
     *  T: result = Expr1.addr op Expr2.addr
     * Expr1 -> Factor
     *  T: Expr1.addr = symbolTable.find(factor)
     */
    public void translateBinaryExpr(
            TAProgram program,
            ASTNode node,
            SymbolTable symbolTable) {

        if(node.isValueType()) {
            node.setProp("addr", symbolTable.createAddressByLexeme(node.getLexeme()));
        }
        else {
            for(var child : node.getChildren()) {
                translateBinaryExpr(program,child, symbolTable);
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
