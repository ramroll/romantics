package parser.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PriorityTable {
    private List<List<String>> table = new ArrayList<>();

    public PriorityTable() {
        table.add(Arrays.asList(new String[]{"&", "|", "^"}));
        table.add(Arrays.asList(new String[]{"==", "!=", ">", "<", ">=", "<="}));
        table.add(Arrays.asList(new String[]{"+", "-"}));
        table.add(Arrays.asList(new String[]{"*", "/"}));
        table.add(Arrays.asList(new String[]{"<<", ">>"}));
    }

    public int size(){
        return table.size();
    }

    public List<String> get(int level) {
        return table.get(level);
    }


}
