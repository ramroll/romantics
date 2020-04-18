# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> test_AlphabetHelper
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/18 1:12 下午
@Desc   ：
=================================================='''
from unittest import TestCase
from lexer.AlphabetHelper import AlphabetHelper

helper = AlphabetHelper()


class TestAlphabetHelper(TestCase):
    def test_is_letter(self):
        self.assertEqual(True, helper.isLetter('a'))
        self.assertEqual(True, helper.isLetter('A'))
        self.assertEqual(False, helper.isLetter('0'))
        self.assertEqual(False, helper.isLetter('ab'))

    def test_is_number(self):
        self.assertEqual(True, helper.isNumber('1'))
        self.assertEqual(True, helper.isNumber('0'))
        self.assertEqual(False, helper.isNumber('11'))

    def test_is_literal(self):
        pass

    def test_is_operator(self):
        for c in "+-*/><=!&|^%":
            self.assertEqual(True, helper.isOperator(c))
