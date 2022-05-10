---
title: 中等
---

## TS 中的 any 和 unknown 有什么区别？

<Answer>

</Answer>

## 请说说 TS 中 never 的理解

<Answer>

</Answer>

## TS 中如何提取函数参数的类型？

<Answer>

</Answer>

## 什么是三斜线指令？有哪些三斜杠指令？

<Answer>


三斜线指令是单行注释，包含用作编译器指令的 XML 标记。每个指令都表示在编译过程中要加载的内容。三斜杠指令仅在其文件的顶部工作，并且将被视为文件中其他任何地方的普通注释。

- `/// <reference path=”…” />` 是最常见的指令，定义文件之间的依赖关系。
- `/// <reference types=”…” />` 类似于path但定义了包的依赖项。
- `/// <reference lib=”…” />` 允许显式包含内置lib文件。

</Answer>

## 说说对 TypeScript 中命名空间与模块的理解？以及它们有什么区别？

<Answer>

</Answer>

## TS 类型中 infer 关键字表示什么意思？

<Answer>

</Answer>

## 如何提取 `Promise<unknown>` 中的泛型参数类型？

<Answer>

```ts
type Awaited<T extends Promise<unknown>> = T extends Promise<infer R>
	? R
	: never;
```

</Answer>

## 请实现内置 Omit

<Answer>

```ts
type MyOmit<T, U extends keyof T> = {
	[P in Exclude<keyof T, U>]: T[P];
};
```

</Answer>

## 请实现将数组的值转换为联合

```ts
type Arr = ["1", "2", "3"];

const a: TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

<Answer>

```ts
type TupleToUnion<T extends any[]> = T[number];
```

</Answer>
