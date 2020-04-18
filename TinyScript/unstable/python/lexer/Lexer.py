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
from .Token import makeNumber, makeOperator, makeString, makeVarOrKeyword,Token
from lexer import TokenType


class Lexer:
    def analyse(self, source):
        """

        :param source: code iterator
        :return:
        """
        tokens = []
        it = PeekIterator(source, "fuck")
        helper = AlphabetHelper()
        while it.hasNext():
            lookahead = it.next()
            # delete comments

            # brackets
            if lookahead in "{}()":
                tokens.append(Token(TokenType.BRACKET, lookahead))
                continue
            # number
            if lookahead in "+-" or helper.isNumber(lookahead):
                # jump 3 + 5, a + 5
                if len(tokens) == 0:
                    lastToken = None
                else:
                    lastToken = tokens[-1]

                if lastToken.getType() != TokenType.VARIABLE and not lastToken.isValue():
                    it.putBack()
                    token = makeNumber(it)
                    tokens.append(token)
                    continue
            # operator
            if helper.isOperator(lookahead):
                it.putBack()
                token = makeOperator(it)
                tokens.append(token)
                continue

            # string
            if lookahead == "'" or lookahead == '"':
                it.putBack()
                token = makeString(it)
                tokens.append(token)
                continue

            # variable or keyword
            if helper.isLiteral(lookahead):
                it.putBack()
                token = makeVarOrKeyword(it)
                tokens.append(token)
        return tokens
