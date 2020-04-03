package common;

import java.util.regex.Pattern;

public class AlphabetHelper {

    static Pattern ptnLetter = Pattern.compile("^[a-zA-Z]$");
    static Pattern ptnNumber = Pattern.compile("^[0-9]$");
    static Pattern ptnLiteral = Pattern.compile("^[_a-zA-Z0-9]$");
    static Pattern ptnOperator = Pattern.compile("^[*+\\-<>=!&|^%/,]$");

    public static boolean isLetter(char c) {
        return ptnLetter.matcher(c + "").matches();
    }

    public static boolean isNumber(char c) {
        return ptnNumber.matcher(c + "").matches();
    }

    public static boolean isLiteral(char c) {
        return ptnLiteral.matcher(c + "").matches();
    }

    public static boolean isOperator(char c) {
        return ptnOperator.matcher(c + "").matches();
    }

}
