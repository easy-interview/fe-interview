---
title: 简单
---

## TS 中的 Declare 关键字有什么用？

<Answer>

`declare` 是用来定义全局变量、全局函数、全局命名空间、js modules、class 等

</Answer>

## TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？

<Answer>

- `any`: 动态的变量类型（失去了类型检查的作用）。
- `never`: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
- `unknown`: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
- `null & undefined`: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和  undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
- `void`: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。

</Answer>

## Typescript中的泛型？作用是什么？

<Answer>

</Answer>
