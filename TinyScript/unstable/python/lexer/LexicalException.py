# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> LexicalException
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/18 7:40 下午
@Desc   ：
=================================================='''


class LexicalException(Exception):
    def __init__(self, c):
        self._c = c

    def __str__(self):
        return "Unexpected character: {}".format(self._c)
