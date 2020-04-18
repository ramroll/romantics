# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> test_Lexer
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/18 9:08 下午
@Desc   ：
=================================================='''
from unittest import TestCase
from lexer.Lexer import Lexer
from lexer import TokenType


class TestLexer(TestCase):
    def test_analyse(self):
        lexer = Lexer()

        source = "(a+b)^100.20==+100-21"
        it = (i for i in source)
        tokens = lexer.analyse(it)
        self.assertEqual(11, len(tokens))
        self.assertToken(tokens[0], "(", TokenType.BRACKET)
        self.assertToken(tokens[1], "a", TokenType.VARIABLE)
        self.assertToken(tokens[2], "+", TokenType.OPERATOR)
        self.assertToken(tokens[3], "b", TokenType.VARIABLE)
        self.assertToken(tokens[4], ")", TokenType.BRACKET)
        self.assertToken(tokens[5], "^", TokenType.OPERATOR)
        self.assertToken(tokens[6], "100.20", TokenType.FLOAT)
        self.assertToken(tokens[7], "==", TokenType.OPERATOR)
        self.assertToken(tokens[8], "+100", TokenType.INTEGER)
        self.assertToken(tokens[9], "-", TokenType.OPERATOR)
        self.assertToken(tokens[10], "21", TokenType.INTEGER)

        source1 = "(a+b)*1.22"
        it1 = (i for i in source1)
        tokens1 = lexer.analyse(it1)
        self.assertEqual(7, len(tokens1))
        self.assertToken(tokens1[0], "(", TokenType.BRACKET)

    def assertToken(self, token, value, type):
        self.assertEqual(token.getValue(), value)
        self.assertEqual(token.getType(), type)
