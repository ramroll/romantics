package gen.operand;

import gen.operand.Operand;

public class Offset extends Operand {

    int offset;
    public Offset(int offset) {
        super();
        this.offset = offset;
    }

    @Override
    public String toString() {
        return this.offset + "";
    }

    public int getOffset(){
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getEncodedOffset() {
        if(offset > 0) {
            return offset;
        }
        return 0x400 | -offset;
    }

    public static Offset decodeOffset(int offset) {
        if( (offset & 0x400) > 0 ) {
            offset = offset & 0x3ff;
            offset = - offset;
        }
        return new Offset(offset);
    }
}
