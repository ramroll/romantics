package translator;

import parser.ast.ASTNode;

import java.util.Hashtable;

public class ExprOptimizer {

    private Hashtable<String, ASTNode> nodes = new Hashtable<>();

    public void optimize(ASTNode node) {
        if(node.isValueType()) {
            node.setProp("hashStr", node.getLexeme().getValue());
        }
        else {
            var hash = node.getLexeme().getValue();
            for(var child : node.getChildren()) {
                optimize(child);
                hash += "|" + child.getProp("hashStr");
            }
            node.setProp("hashStr", hash);
        }
        if(nodes.containsKey(node.getProp("hashStr"))) {
            node.replace(nodes.get(node.getProp("hashStr")));
        } else {
            nodes.put((String) node.getProp("hashStr"), node);
        }

    }

}
