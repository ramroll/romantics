# -*- coding: UTF-8 -*-
'''=================================================
@Project -> File   ：TinyScript -> PeekIterator
@IDE    ：PyCharm
@Author ：QiangZiBro
@Date   ：2020/4/12 6:25 下午
@Desc   ：
=================================================='''
CACHE_SIZE = 10


class PeekIterator:
    def __init__(self, it, endToken=None):
        self.it = it
        self.endToken = endToken
        self.stackPutBacks = []
        self.queueCache = []

    def peek(self):
        if len(self.stackPutBacks) > 0:
            return self.stackPutBacks[-1]
        val = self.next()
        self.putBack()
        return val

    def putBack(self):
        if len(self.queueCache) > 0:
            self.stackPutBacks.append(self.queueCache.pop())

    def hasNext(self):
        return self.endToken is not None and self.peek() is not None

    def next(self):
        if len(self.stackPutBacks) > 0:
            val = self.stackPutBacks.pop()
        else:
            try:
                val = next(self.it)
            except StopIteration:
                #before
                # tmp = self.endToken
                # self.endToken = None
                # return tmp

                #after
                val = self.endToken
                self.endToken = None

        # process cache
        while len(self.queueCache) > CACHE_SIZE - 1:
            self.queueCache.pop(0)
        self.queueCache.append(val)
        return val
