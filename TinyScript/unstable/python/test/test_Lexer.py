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

        source = "(a+b)*1.22"
        it = (i for i in source)
        token = lexer.analyse(it)
        self.assertEqual(7, len(token))
        self.assertToken(token[0], "(", TokenType.BRACKET)

        source = """
            func foo(a,b){
                print(a+b) // two sum
                /*  multi lines comment
                    whatever written here will not be parsed
                */
            }
        """
        it = (i for i in source)
        token = lexer.analyse(it)
        self.assertEqual(15, len(token))
        self.assertToken(token[0], "func", TokenType.KEYWORD)
        print(token)

    def assertToken(self, token, value, type):
        self.assertEqual(token.getValue(), value)
        self.assertEqual(token.getType(), type)
