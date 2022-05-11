---
title: 中等
---

## 什么是动态规划？

<Answer>

动态规划（Dynamic programming，简称DP）是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。

动态规划常常适用于有重叠子问题和最优子结构性质的问题，动态规划方法所耗时间往往远少于朴素解法。

通常许多子问题非常相似，为此动态规划法试图仅仅解决每个子问题一次，从而减少计算量：一旦某个给定子问题的解已经算出，则将其记忆化存储，以便下次需要同一个子问题解之时直接查表。这种做法在重复子问题的数目关于输入的规模呈指数增长时特别有用。

</Answer>

## 请实现最长公共子串算法

最长公共子串问题是寻找两个或多个已知字符串最长的子串。此问题与最长公共子序列问题的区别在于子序列不必是连续的，而子串却必须是。

<Answer>

</Answer>

## 请介绍并实现合并排序

<Answer>

</Answer>

## 请介绍并实现快速排序

<Answer>

</Answer>

## LRU 缓存

请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

https://leetcode.cn/problems/lru-cache/

<Answer>

```js
// 第一步代码
class LRUCache {
    constructor(n){
        this.size = n; // 初始化最大缓存数据条数n
        this.data = new Map(); // 初始化缓存空间map
    }
    
    // 第二步代码
    put(domain, info){
        if(this.data.size >= this.size) {
        // 删除最不常用数据
        const firstKey= [...this.data.keys()][0];
        // 次数不必当心data为空，因为this.size 一般不会取0，满足this.data.size >= this.size时，this.data自然也不为空。
        this.data.delete(firstKey);
        }
        this.data.set(domain, info) // 写入数据
    }

    // 第三步代码
    get(domain) {
        if(!this.data.has(domain)){
            return false;
        }
        const info = this.data.get(domain); //获取结果
        this.data.delete(domain); // 移除数据
        this.data.set(domain, info); // 重新添加该数据
        return info;
    }
}
```

</Answer>

## 接雨滴

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

https://leetcode.cn/problems/trapping-rain-water/

<Answer>

</Answer>

## 接雨水 II

给你一个 m x n 的矩阵，其中的值均为非负整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。

https://leetcode.cn/problems/trapping-rain-water-ii/

<Answer>

</Answer>

## 请实现输出汉诺塔移动顺序的函数

汉诺塔是根据一个传说形成的数学问题：

有三根杆子A，B，C。A杆上有 N 个 (N>1) 穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至 C 杆：

每次只能移动一个圆盘；
大盘不能叠在小盘上面。

用代码怎么表示n个圆盘是怎么移动的呢？

```js
hanoi(3, '起始柱', '目标柱', '备用柱')
// 请实现 hanoi 函数，第一个是圆盘数量，后面是 3 个柱子
// 打印出每一步的动作，如 `从 起始柱 移动到 目标柱`
```

<Answer>

```py
def hanoi(n, form, to, spare):
    if n == 1:
        print('从 %s 移动到 %s' % (form, to))
    else:
        hanoi(n-1, form, spare, to) # 除最底下的大圆盘把其他移动到备用柱
        hanoi(1, form, to, spare) # 把最底下的大圆盘移动到目标柱
        hanoi(n-1, spare, to, form) # 再把备用柱上的圆盘移动到目标柱
```

</Answer>

## 数组中的第 K 个最大元素

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

https://leetcode.cn/problems/kth-largest-element-in-an-array/

<Answer>

</Answer>

## 环形链表 II

给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改 链表。

https://leetcode.cn/problems/linked-list-cycle-ii/

## 链表中环的入口节点

给定一个链表，返回链表开始入环的第一个节点。 从链表的头节点开始沿着 next 指针进入环的第一个节点为环的入口节点。如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

说明：不允许修改给定的链表。

https://leetcode.cn/problems/c32eOV/

<Answer>

</Answer>

## 反转链表 II

给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

https://leetcode.cn/problems/reverse-linked-list-ii/

<Answer>

</Answer>

## 螺旋矩阵

给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

https://leetcode.cn/problems/spiral-matrix/

<Answer>

</Answer>

## 最长连续序列

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

https://leetcode.cn/problems/longest-consecutive-sequence/

<Answer>

</Answer>

## 比较版本号

给你两个版本号 version1 和 version2 ，请你比较它们。

版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33 和 0.1 都是有效的版本号。

比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。

返回规则如下：

- 如果 version1 > version2 返回 1，
- 如果 version1 < version2 返回 -1，
- 除此之外返回 0。

https://leetcode.cn/problems/compare-version-numbers/

<Answer>

</Answer>

## 子集

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

https://leetcode.cn/problems/subsets/

<Answer>

</Answer>
