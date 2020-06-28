import PeekIterator from "../common/PeekIterator";
import AlphabetHelper from "./AlphabetHelper";
import LexicalException from "./LexicalException";

export enum TokenType {
  KEYWORD,
  VARIABLE,
  OPERATOR,
  BRACKET,
  INTEGER,
  FLOAT,
  BOOLEAN,
  STRING
}

const KeyWords = new Set([
  'var', 'let', 'const',
  'if', 'else',
  'for', 'while', 'break',
  'func', 'return',
  'int', 'float', 'bool', 'void', 'string'
])

interface IToken<T> {
  type: TokenType
  value: T
  getType(): TokenType
  getValue(): T
  isType(): boolean
  isValue(): boolean
  isScalar(): boolean
  isVariable(): boolean
  toString(): string
}
export class Token<T=string> implements IToken<T> {
  type: TokenType;
  value: T;
  constructor(type: TokenType, value: T) {
    this.type = type
    this.value = value
  }
  getType(): TokenType {
    return this.type
  }
  getValue<O=T>(): T | O {
    return this.value
  }
  isType(): boolean {
    const value = this.getValue<string>()
    return value === 'bool' || 
      value === 'int' ||
      value === 'float' ||
      value === 'void' ||
      value === 'string'
  }
  isValue(): boolean {
    return this.isScalar() || this.isVariable()
  }
  isScalar(): boolean {
    const type = this.getType()
    return type === TokenType.INTEGER ||
      type === TokenType.FLOAT ||
      type === TokenType.STRING ||
      type === TokenType.BOOLEAN
  }
  isVariable(): boolean {
    return this.getType() === TokenType.VARIABLE
  }
  toString(): string {
    return `type ${this.getType()}, value ${this.getValue()}`
  }

  static makeVarOrKeyword(it: PeekIterator) {
    let s = ''
    while (it.hasNext()) {
      let c = it.peek()
      if (AlphabetHelper.isLiteral(c)) {
        s += c
      } else {
        break;
      }
      it.next()
    }

    if (KeyWords.has(s)) {
      return new Token(TokenType.KEYWORD, s)
    }
    if (s === 'true' || s === 'false') {
      return new Token(TokenType.BOOLEAN, s)
    }
    return new Token(TokenType.VARIABLE, s)
  }
  static makeString(it: PeekIterator) {
    let s = ''
    let state = 0
    while (it.hasNext()) {
      let c = it.next()
      switch(state) {
        case 0:
          if (c === `"`) {
            state = 1
          } else {
            state = 2
          }
          break
        case 1:
          if (c === `"`) {
            return new Token(TokenType.STRING, s + c)
          }
          break
        case 2:
          if (c === `'`) {
            return new Token(TokenType.STRING, s + c)
          }
          break
      }
      s += c;
    }
    throw new LexicalException('Unexpected error')
  }
  static makeOp(it: PeekIterator) {
    let state = 0
    let s = ''

    while (it.hasNext()) {
      let lookahead = it.next()
      switch(state) {
        case 0:
          const index = [,...'+-*/><=!&|^%'].indexOf(lookahead)
          if (index !== -1) {
            state = index
          } else {
            if (lookahead === ',' || lookahead === ';') {
              return new Token(TokenType.OPERATOR, lookahead)
            }
          }
          s += lookahead
          break
        case 1:
        case 2:
          if (lookahead === '+' || lookahead === '-' || lookahead === '=') {
            return new Token(TokenType.OPERATOR, s + lookahead)
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, s)
          }
        case 3:
        case 4:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, s + '=');
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, s);
          }
        case 5:
        case 6:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, s + '=');
          } else if (lookahead === s) {
            return new Token(TokenType.OPERATOR, s + lookahead);
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, s);
          }
        case 7:
        case 8:
        case 12:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, s + '=');
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, s);
          }
        case 9:
        case 10:
        case 11:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, s + '=');
          } else if (lookahead === s) {
            return new Token(TokenType.OPERATOR, s + lookahead);
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, s);
          }
      }
    }

    throw new LexicalException('Unexpected error')
  }
  static makeNumber(it: PeekIterator) {
    let state = 0
    let s = ''
    while (it.hasNext()) {
      let lookahead = it.peek()
      switch(state) {
        case 0:
          if (lookahead == "0") {
            state = 1;
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2;
          } else if (lookahead == "+" || lookahead == "-") {
            state = 3;
          } else if (lookahead == ".") {
            state = 5;
          }
          break;
        case 1:
          if (lookahead == "0") {
            state = 1;
          } else if (lookahead == ".") {
            state = 4;
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2;
          } else {
            return new Token(TokenType.INTEGER, s);
          }
          break;
        case 2:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2;
          } else if (lookahead == ".") {
            state = 4;
          } else {
            return new Token(TokenType.INTEGER, s);
          }
          break;
        case 3:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2;
          } else if (lookahead == ".") {
            state = 5;
          } else {
            throw LexicalException.fromChar(lookahead);
          }
          break;
        case 4:
          if (lookahead == ".") {
            throw LexicalException.fromChar(lookahead);
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 20;
          } else {
            return new Token(TokenType.FLOAT, s);
          }
          break;
        case 5:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20;
          } else {
            throw LexicalException.fromChar(lookahead);
          }
          break;
        case 20:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20;
          } else if (lookahead == ".") {
            throw LexicalException.fromChar(lookahead);
          } else {
            return new Token(TokenType.FLOAT, s);
          }
      }
      s += lookahead
      it.next()
    }
    throw new LexicalException('Unexpected error')
  }
}