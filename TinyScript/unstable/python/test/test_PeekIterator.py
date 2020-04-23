# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> test_PeekIterator
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/12 7:01 下午
@Desc   ：
=================================================='''
from unittest import TestCase
from common.ListToGenerator import listToGenerator
from common.PeekIterator import PeekIterator


class TestPeekIterator(TestCase):
    def test_peek(self):
        it = PeekIterator((i for i in "abcdefg"))
        self.assertEqual(it.next(), 'a')
        self.assertEqual(it.next(), 'b')
        self.assertEqual(it.peek(), 'c')
        self.assertEqual(it.peek(), 'c')
        self.assertEqual(it.next(), 'c')
        self.assertEqual(it.next(), 'd')
        self.assertEqual(it.next(), 'e')
        self.assertEqual(it.next(), 'f')

    def test_put_back(self):
        it = PeekIterator((i for i in "abcdefg"))
        self.assertEqual(it.next(), 'a')
        self.assertEqual(it.peek(), 'b')
        self.assertEqual(it.next(), 'b')
        self.assertEqual(it.next(), 'c')
        it.putBack()
        it.putBack()
        self.assertEqual(it.next(), 'b')
        self.assertEqual(it.next(), 'c')
        self.assertEqual(it.peek(),it.next())

        it = PeekIterator((i for i in "a+b"), '\0')
        c = it.next()
        lookahead = it.peek()
        it.putBack()
        self.assertEqual(it.peek(), 'a')


    def test_end_token(self):
        it = PeekIterator((i for i in "abcdefg"), '\0')
        for i in range(8):
            if i == 7:
                self.assertEqual(it.next(), '\0')
            else:
                self.assertEqual(it.next(), "abcdefg"[i])

        it = PeekIterator((i for i in [1, 2]), endToken='a')
        # self.assertEqual(it.next(), 'a')
        self.assertEqual(it.next(), 1)
        self.assertEqual(it.next(), 2)
        self.assertEqual(it.hasNext(), True)
        self.assertEqual(it.next(), 'a')
