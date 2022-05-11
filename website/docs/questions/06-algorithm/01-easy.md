---
title: 简单
---

## 什么是算法复杂度和空间复杂度？

<Answer>

空间复杂度是对一个算法在运行过程中临时占用存储空间的大小。

计算方法
忽略常数，用O(1)表示
递归算法的空间复杂度=(递归深度n)*(每次递归所要的辅助空间)
仅仅只复制单个变量，空间复杂度为O(1)。

举例如下：空间复杂度为O(n) = O(1)。

</Answer>

## 广度和深度优先搜索有什么区别？

<Answer>

</Answer>

## 说说你对树的理解

<Answer>

在计算机领域，树形数据结构是一类重要的非线性数据结构，可以表示数据之间一对多的关系。形状类型一个倒着的树。

树有一个根节点，根节点之下是它的子节点，子节点也可能有子节点，一层一层的往下。如果一个节点没有子节点，一般将这个节点称为叶子节点。

</Answer>

## 说说你对堆的理解

<Answer>

堆(Heap)是计算机科学中一类特殊的数据结构的统称，堆通常是一个可以被看做一棵完全二叉树的数组对象。

总是满足下列性质：

堆中某个结点的值总是不大于或不小于其父结点的值
堆总是一棵完全二叉树
堆又可以分成最大堆和最小堆：

最大堆：每个根结点，都有根结点的值大于两个孩子结点的值
最小堆：每个根结点，都有根结点的值小于孩子结点的值

</Answer>

## 说说你对图的理解

<Answer>



</Answer>

## 什么是位图？

<Answer>

</Answer>

## 请介绍并实现二分查找算法

<Answer>

</Answer>

## 请实现一个可以返回斐波那契数列的函数

<Answer>

```js

```

</Answer>

## 什么是冒泡排序？请实现冒泡排序

<Answer>

</Answer>

## 转置矩阵

给你一个二维整数数组 matrix， 返回 matrix 的 转置矩阵 。

矩阵的 转置 是指将矩阵的主对角线翻转，交换矩阵的行索引与列索引。

https://leetcode.cn/problems/transpose-matrix/

<Answer>

</Answer>

## 爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

https://leetcode.cn/problems/climbing-stairs/

<Answer>

</Answer>

## 使用最小花费爬楼梯

给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。

你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。

请你计算并返回达到楼梯顶部的最低花费。

https://leetcode.cn/problems/min-cost-climbing-stairs/

<Answer>

</Answer>

## 路径总和

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点。

https://leetcode.cn/problems/path-sum/

<Answer>

</Answer>

## 路径总和 II

给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

叶子节点 是指没有子节点的节点。

https://leetcode.cn/problems/path-sum-ii/

<Answer>

</Answer>

## 二叉树的前序遍历

给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

https://leetcode.cn/problems/binary-tree-preorder-traversal/

<Answer>

</Answer>

## 二叉树的中序遍历

给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

https://leetcode.cn/problems/binary-tree-inorder-traversal/

<Answer>

</Answer>

## 二叉树的后序遍历

给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。

https://leetcode.cn/problems/binary-tree-postorder-traversal/

<Answer>

</Answer>

## 二叉树的层序遍历

给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

https://leetcode.cn/problems/binary-tree-level-order-traversal/

<Answer>

</Answer>

## 二叉树的锯齿形层序遍历

给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/

<Answer>

</Answer>

## 二叉树的右视图

给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

https://leetcode.cn/problems/binary-tree-right-side-view/

<Answer>

</Answer>

## 买卖股票的最佳时机

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

<Answer>

</Answer>

## 买卖股票的最佳时机 II

给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。

返回 你能获得的 最大 利润 。

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/

<Answer>

</Answer>

## 只出现一次的数字

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

https://leetcode.cn/problems/single-number/

<Answer>

</Answer>
