package lexer;

import common.AlphabetHelper;
import common.PeekIterator;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.stream.Stream;

public class Lexer {

    public ArrayList<Token> analyse(PeekIterator<Character> it) throws LexicalException {
        var tokens = new ArrayList<Token>();

        while(it.hasNext()) {
            char c = it.next();

            if(c == 0) {
                break;
            }
            char lookahead = it.peek();

            if(c == ' ' || c == '\n') {
                continue;
            }

            // 删除注释
            if(c == '/') {
                if(lookahead == '/') {
                    while(it.hasNext() && (c = it.next()) != '\n') {};
                    continue;
                }
                else if(lookahead == '*') {
                    it.next();//多读一个* 避免/*/通过
                    boolean valid = false;
                    while(it.hasNext()) {
                        char p = it.next();
                        if(p == '*' && it.peek() == '/') {
                            it.next();
                            valid = true;
                            break;
                        }
                    }
                    if(!valid) {
                        throw new LexicalException("comments not match");
                    }
                    continue;
                }
            }

            if(c == '{' || c == '}' || c == '(' || c == ')') {
                tokens.add(new Token(TokenType.BRACKET, c+""));
                continue;
            }

            if(c == '"' || c == '\'') {
                it.putBack();
                tokens.add(Token.makeString(it));
                continue;
            }

            if(AlphabetHelper.isLetter(c)) {
                it.putBack();;
                tokens.add(Token.makeVarOrKeyword(it));
                continue;
            }


            if(AlphabetHelper.isNumber(c)) {
                it.putBack();
                tokens.add(Token.makeNumber(it));
                continue;
            }


            if((c == '+' || c == '-' || c == '.') && AlphabetHelper.isNumber(lookahead)) {
                var lastToken = tokens.size() == 0 ? null : tokens.get(tokens.size() - 1);

                if(lastToken == null || !lastToken.isValue() || lastToken.isOperator()) {
                    it.putBack();
                    tokens.add(Token.makeNumber(it));
                    continue;
                }
            }

            if(AlphabetHelper.isOperator(c)) {
                it.putBack();
                tokens.add(Token.makeOp(it));
                continue;
            }

            throw new LexicalException(c);
        } // end while
        return tokens;
    }

   public ArrayList<Token> analyse(Stream source) throws LexicalException {
        var it = new PeekIterator<Character>(source, (char)0);
        return this.analyse(it);
    }

    /**
     * 从源代码文件加载并解析
     * @param src
     * @return
     * @throws FileNotFoundException
     * @throws UnsupportedEncodingException
     * @throws LexicalException
     */
    public static ArrayList<Token> fromFile(String src) throws FileNotFoundException, UnsupportedEncodingException, LexicalException {
        var file = new File(src);
        var fileStream = new FileInputStream(file);
        var inputStreamReader = new InputStreamReader(fileStream, "UTF-8");

        var br = new BufferedReader(inputStreamReader);


        /**
         * 利用BufferedReader每次读取一行
         */
        var it = new Iterator<Character>() {
            private String line = null;
            private int cursor = 0;

            private void readLine() throws IOException {
                if(line == null || cursor == line.length()) {
                    line = br.readLine();
                    cursor = 0;
                }
            }
            @Override
            public boolean hasNext() {
                try {
                    readLine();
                    return line != null;
               } catch (IOException e) {
                    return false;
                }
            }

            @Override
            public Character next() {
                try {
                    readLine();
                    return line != null ? line.charAt(cursor++) :null;
                } catch (IOException e) {
                    return null;
                }
            }
        };

        var peekIt = new PeekIterator<Character>(it, '\0');

        var lexer = new Lexer();
        return lexer.analyse(peekIt);

    }
}
