# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> ListToGenerator
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/12 6:48 下午
@Desc   ：
=================================================='''

from common.PeekIterator import PeekIterator


def listToGenerator(L):
    it = (i for i in L)
    return PeekIterator(it, '\0')
