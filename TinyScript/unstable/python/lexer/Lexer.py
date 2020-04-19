# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> Lexer
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/12 6:10 下午
@Desc   ：
=================================================='''

from common.PeekIterator import PeekIterator
from .AlphabetHelper import AlphabetHelper
from .Token import makeNumber, makeOperator, makeString, makeVarOrKeyword, Token
from lexer import TokenType
from lexer.LexicalException import LexicalException


class Lexer:
    def analyse(self, source):
        """

        :param source: code iterator
        :return:
        """
        tokens = []
        it = PeekIterator(source, "\0")
        helper = AlphabetHelper()
        while it.hasNext():
            c = it.next()
            if c == "\0":
                break
            lookahead = it.peek()
            # delete comments
            if c == "/":
                if lookahead == "/":
                    c = it.next()
                    while it.hasNext() and c != "\n":
                        c = it.next()
                elif lookahead == "*":
                    valid = False
                    while it.hasNext():
                        p = it.next()
                        if p == "*" and it.peek() == "/":
                            valid = True
                            it.next()
                            break
                    if not valid:
                        raise LexicalException("comment not matched")
                    continue

            # brackets
            if c in "{}()":
                tokens.append(Token(TokenType.BRACKET, c))
                continue

            # number
            # case1: 334+...
            if helper.isNumber(c):
                it.putBack()
                tokens.append(makeNumber(it))
                continue
            # case2: +5, 3*-5, where c is +,- respectively
            if c in "+-" and helper.isNumber(lookahead):
                # jump 3 + 5, a + 5
                if len(tokens) == 0:
                    lastToken = None
                else:
                    lastToken = tokens[-1]

                # two cases that can think it a number +5, 3*-5
                if lastToken is None or not lastToken.isValue():
                    it.putBack()
                    token = makeNumber(it)
                    tokens.append(token)
                    continue
            # operator
            if helper.isOperator(c):
                it.putBack()
                token = makeOperator(it)
                tokens.append(token)
                continue

            # string
            if c == "'" or c == '"':
                it.putBack()
                token = makeString(it)
                tokens.append(token)
                continue

            # variable or keyword
            if helper.isLiteral(c):
                it.putBack()
                token = makeVarOrKeyword(it)
                tokens.append(token)
        return tokens
