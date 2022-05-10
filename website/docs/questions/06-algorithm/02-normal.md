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

## 请写一个 LRU 缓存函数

关于缓存，有个常见的例子是，当用户访问不同站点时，浏览器需要缓存在对应站点的一些信息，这样当下次访问同一个站点的时候，就可以使访问速度变快（因为一部分数据可以直接从缓存读取）。 但是想想内存空间是有限的，所以必须有一些规则来管理缓存的使用，而LRU（Least Recently Used） Cache就是其中之一，直接翻译就是“最不经常使用的数据，重要性是最低的，应该优先删除”。

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

## 请解决接雨滴问题

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

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
