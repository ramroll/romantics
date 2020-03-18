package parser.util;

import parser.ast.ASTNode;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;

public class GraphvizHelpler {

    HashMap<ASTNode, String> nodeLabels = new HashMap<>();
    HashSet<String> edgeSet = new HashSet<>();
    int i = 0;


    private String visNode(ASTNode node) {
        nodeLabels.put(node, "v" + ++i);
        return String.format("%s[label=\"%s\"]\n",
                "v"+i,
                node.getLabel()
        );
    }

    private String visEdge(ASTNode a, ASTNode b) {
        var edgeStr = String.format("\"%s\" -> \"%s\"\n",
                nodeLabels.get(a),
                nodeLabels.get(b)
        );
        if(!this.edgeSet.contains(edgeStr)) {
            edgeSet.add(edgeStr);
            return edgeStr;
        }
        return "";
    }

    public String toDot(ASTNode root) {
        var queue = new LinkedList<ASTNode>();
        var edges = new HashSet<String>();
        queue.add(root);
        var str = "";
        while(queue.size() > 0) {
            var node = queue.poll();
            if(!nodeLabels.containsKey(node)) {
                str += visNode(node) ;
            }
            for(var child:node.getChildren()) {
                if(!nodeLabels.containsKey(child)) {
                    str += visNode(child);
                }

                str += visEdge(node, child);
                queue.add(child);
            }
        }
        return str;
    }

}
