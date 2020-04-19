# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> Token
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/12 5:59 下午
@Desc   ：
=================================================='''
from .TokenType import *
from .AlphabetHelper import AlphabetHelper
from .LexicalException import LexicalException

Keywords = (
    "var",
    "if",
    "while",
    "break",
    "func",
    "return"
    "for"

)


def makeVarOrKeyword(it):
    """
    A factory method, produce a variable or keyword
    :param it: a stream
    :return: `Token` object
    """
    s = ""
    helper = AlphabetHelper()
    while it.hasNext():
        c = it.peek()
        if helper.isLiteral(c):
            s += c
        else:
            break
        it.next()

    if s in Keywords:
        return Token(KEYWORD, s)
    if s == "true" or s == "false":
        return Token(BOOLEAN, s)
    return Token(VARIABLE, s)


def makeString(it):
    s = ""
    state = 0
    while it.hasNext():
        c = it.next()
        if state == 0:
            if c == '"':
                state = 1
            elif c == "'":
                state = 2
        elif state == 1:
            if c == '"':
                return Token(STRING, s + c)
        elif state == 2:
            if c == "'":
                return Token(STRING, s + c)
        s += c

    raise Exception("Unexpected error")


def makeOperator(it):
    state = 0
    while it.hasNext():
        lookahead = it.next()
        if state == 0:
            if lookahead == "+":
                state = 1
            elif lookahead == "-":
                state = 2
            elif lookahead == "*":
                state = 3
            elif lookahead == "/":
                state = 4
            elif lookahead == ">":
                state = 5
            elif lookahead == "<":
                state = 6
            elif lookahead == "=":
                state = 7
            elif lookahead == "!":
                state = 8
            elif lookahead == "&":
                state = 9
            elif lookahead == "|":
                state = 10
            elif lookahead == "^":
                state = 11
            elif lookahead == "%":
                state = 12
            elif lookahead == ",":
                return Token(OPERATOR, ",")
            elif lookahead == ";":
                return Token(OPERATOR, ";")
        elif state == 1:
            if lookahead == "+":
                return Token(OPERATOR, "++")
            elif lookahead == "=":
                return Token(OPERATOR, "+=")
            else:
                it.putBack()
                return Token(OPERATOR, "+")
        elif state == 2:
            if lookahead == "-":
                return Token(OPERATOR, "--")
            elif lookahead == "=":
                return Token(OPERATOR, "-=")
            else:
                it.putBack()
                return Token(OPERATOR, "-")
        elif state == 3:
            if lookahead == "=":
                return Token(OPERATOR, "*=")
            else:
                it.putBack()
                return Token(OPERATOR, "*")
        elif state == 4:
            if lookahead == "=":
                return Token(OPERATOR, "/=")
            else:
                it.putBack()
                return Token(OPERATOR, "/")
        elif state == 5:
            if lookahead == ">":
                return Token(OPERATOR, ">>")
            elif lookahead == "=":
                return Token(OPERATOR, ">=")
            else:
                it.putBack()
                return Token(OPERATOR, ">")
        elif state == 6:
            if lookahead == "<":
                return Token(OPERATOR, "<<")
            elif lookahead == "=":
                return Token(OPERATOR, "<=")
            else:
                it.putBack()
                return Token(OPERATOR, "<")
        elif state == 7:
            if lookahead == "=":
                return Token(OPERATOR, "==")
            else:
                it.putBack()
                return Token(OPERATOR, "=")
        elif state == 8:
            if lookahead == "=":
                return Token(OPERATOR, "!=")
            else:
                it.putBack()
                return Token(OPERATOR, "!")
        elif state == 9:
            if lookahead == "&":
                return Token(OPERATOR, "&&")
            elif lookahead == "=":
                return Token(OPERATOR, "&=")
            else:
                it.putBack()
                return Token(OPERATOR, "&")
        elif state == 10:
            if lookahead == "=":
                return Token(OPERATOR, "|=")
            elif lookahead == "|":
                return Token(OPERATOR, "||")
            else:
                it.putBack()
                return Token(OPERATOR, "|")
        elif state == 11:
            if lookahead == "=":
                return Token(OPERATOR, "^=")
            else:
                it.putBack()
                return Token(OPERATOR, "^")
        elif state == 12:
            if lookahead == "=":
                return Token(OPERATOR, "%=")
            else:
                it.putBack()
                return Token(OPERATOR, "%")
    # end while loop
    raise Exception("Unexpected error")


def makeNumber(it):
    helper = AlphabetHelper()
    s = ""
    state = 0
    while it.hasNext():
        # a = list(it.it)
        lookahead = it.peek()
        if state == 0:
            if lookahead == '0':
                state = 1
            elif helper.isNumber(lookahead):
                state = 2
            elif lookahead == "+" or lookahead == "-":
                state = 3
            elif lookahead == ".":
                state = 5
            else:
                raise LexicalException(lookahead)
        elif state == 1:
            if lookahead == '0':
                state = 1
            elif lookahead == ".":
                state = 4
            elif helper.isNumber(lookahead):
                state = 2
        elif state == 2:
            if helper.isNumber(lookahead):
                state = 2
            elif lookahead == ".":
                state = 4
            else:
                return Token(INTEGER, s)
        elif state == 3:
            if helper.isNumber(lookahead):
                state = 2
            elif lookahead == ".":
                state = 5
            else:
                raise LexicalException(lookahead)
        elif state == 4:
            if helper.isNumber(lookahead):
                state = 20
            elif lookahead == ".":
                raise LexicalException(lookahead)
            else:
                return Token(FLOAT, s)
        elif state == 5:
            if helper.isNumber(lookahead):
                state = 20
            else:
                raise LexicalException(lookahead)
        elif state == 20:
            if helper.isNumber(lookahead):
                state = 20
            elif lookahead == ".":
                raise LexicalException(lookahead)
            else:
                return Token(FLOAT, s)

        s += lookahead
        a = it.next()
    raise LexicalException("Unexpected")


class Token:
    """
    A token with type and value
    """

    def __init__(self, type, value):
        self._type = type
        self._value = value

    def getType(self):
        return self._type

    def getValue(self):
        return self._value

    def isVariable(self):
        return self._type == VARIABLE

    def isScalar(self):
        return self._type == INTEGER or self._type == FLOAT or \
               self._type == STRING or self._type == BOOLEAN

    def isValue(self):
        return self.isScalar() or self.isVariable()

    def toString(self):
        return "type {}, value {}".format(self._type.type, self._value.value)

    def __repr__(self):
        return self._value
