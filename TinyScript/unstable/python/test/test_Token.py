# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> test_Token
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/18 2:12 下午
@Desc   ：
=================================================='''
from unittest import TestCase
from lexer.Token import makeVarOrKeyword, makeString, makeOperator, makeNumber
from lexer.LexicalException import LexicalException
from common.ListToGenerator import listToGenerator
from common.PeekIterator import PeekIterator
import lexer.TokenType as TokenType


class TestToken(TestCase):
    def test_make_var_or_keyword(self):
        it1 = listToGenerator([i for i in "if abc"])
        it2 = listToGenerator([i for i in "true abc"])
        token1 = makeVarOrKeyword(it1)
        token2 = makeVarOrKeyword(it2)
        self.assertToken(token1, "if", TokenType.KEYWORD)
        self.assertToken(token2, "true", TokenType.BOOLEAN)

        it1.next()
        token3 = makeVarOrKeyword(it1)
        self.assertToken(token3, "abc", TokenType.VARIABLE)

    def assertToken(self, token, value, type):
        self.assertEqual(token.getValue(), value)
        self.assertEqual(token.getType(), type)

    def test_make_string(self):
        tests = ['"abc"', "'abc'"]
        for test in tests:
            it = listToGenerator([i for i in test])
            token = makeString(it)
            self.assertToken(token, test, TokenType.STRING)

    def test_make_op(self):
        tests = [
            ["++1233", "++"],
            [",hello", ","],
            ["-=1234", "-="],
            ["+dm", "+"],
            ["&=34", "&="],
            ["^12344", "^"],
            ["^=12344", "^="],
            ["%123", "%"]
        ]
        for test in tests:
            expr, ans = test
            it = listToGenerator([s for s in expr])
            token = makeOperator(it)
            self.assertToken(token, ans, TokenType.OPERATOR)

    def test_make_number(self):
        tests = [
            ["1.22", "1.22"],
            ["1.22 abc", "1.22"],
            ["12.22,", "12.22"],
            ["122,33", "122"],
            ["-12.22 abc", "-12.22"],
            ["-.22 abc", "-.22"],
            ["+.22 abc", "+.22"],
            ["0000001.12, 22", "0000001.12"],
            ["12 abc", "12"]
        ]

        unexpected_tests = [
            "12.22.1",
            "12..22",
            "..",
            "-+",
            "-.",
            "0000.0."

        ]

        for test in tests:
            expr, ans = test
            type = TokenType.FLOAT if "." in ans else TokenType.INTEGER
            it = listToGenerator([e for e in expr])
            token = makeNumber(it)
            self.assertToken(token, ans, type)

        for unexpected_test in unexpected_tests:
            it = listToGenerator([e for e in unexpected_test])
            with self.assertRaises(LexicalException):
                makeNumber(it)
