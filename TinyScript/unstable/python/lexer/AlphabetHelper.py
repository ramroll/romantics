# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> AlphabetHelper
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/18 12:55 下午
@Desc   ： judge the type of a character
=================================================='''
import re


class AlphabetHelper:
    ptnLetter = "^[a-zA-Z]$"
    ptnNumber = "^[0-9]$"
    ptnLiteral = "^[_a-zA-Z0-9]$"  # English text
    ptnOperator = r"^[+-\\*/><=!&|^%]$"

    def isLetter(self, c):
        return re.match(self.ptnLetter, c) is not None

    def isNumber(self, c):
        return re.match(self.ptnNumber, c) is not None

    def isLiteral(self, c):
        return re.match(self.ptnLiteral, c) is not None

    def isOperator(self, c):
        return re.match(self.ptnOperator, c) is not None
