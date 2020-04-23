# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> TokenType
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/12 5:53 下午
@Desc   ：
=================================================='''
from common.Enum import Enum

KEYWORD = Enum("KEYWORD", 1)
VARIABLE = Enum("VARIABLE", 1)
OPERATOR = Enum("OPERATOR", 1)
BRACKET = Enum("BRACKET", 1)
INTEGER = Enum("INTEGER", 1)
FLOAT = Enum("FLOAT", 1)
BOOLEAN = Enum("BOOLEAN", 1)
STRING = Enum("STRING", 1)
