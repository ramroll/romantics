package common;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PeekIteratorTests {

    @Test
    public void test_peek() {
        var source = "abcdefg";
        var it = new PeekIterator<Character>(source.chars().mapToObj(c -> (char)c));

        assertEquals('a', it.next());
        assertEquals('b', it.next());
        it.next();
        it.next();
        assertEquals('e', it.next());
        assertEquals('f', it.peek());
        assertEquals('f', it.peek());
        assertEquals('f', it.next());
        assertEquals('g', it.next());

    }

    @Test
    public void test_lookahead2(){
        var source = "abcdefg";
        var it = new PeekIterator<Character>(source.chars().mapToObj(c -> (char)c));
        assertEquals('a', it.next());
        assertEquals('b', it.next());
        assertEquals('c', it.next());
        it.putBack();
        it.putBack();
        assertEquals('b', it.next());
    }

    @Test
    public void test_endToken(){
        var source = "abcdefg";
        var it = new PeekIterator<Character>(source.chars().mapToObj(c -> (char)c), (char)0);
        var i = 0;
        while(it.hasNext()) {
            if(i == 7) {
                assertEquals((char)0, it.next());
            } else {
                assertEquals(source.charAt(i++), it.next());
            }
        }
    }


}
