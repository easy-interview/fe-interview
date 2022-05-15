---
title: 简单
---

## TS 中的 Declare 关键字有什么用？

<Answer>

通过 declare 关键字可以来告诉 TypeScript，正在试图表述一个其他地方已经存在的代码，`declare` 一般用来定义全局变量、全局函数、全局命名空间、js modules、class 等

</Answer>

## TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？

<Answer>

- `any`: 动态的变量类型（失去了类型检查的作用）。
- `never`: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
- `unknown`: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
- `null & undefined`: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和  undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
- `void`: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。

</Answer>

## TS 中的 type 和 interface 有什么区别？

<Answer>

`type` 和 `interface` 有很多的共同点，在功能上非常相似，它们更多的是语义的差别。`type` 是类型别名，`interface` 定义接口由 `class` 去实现这个接口。

它们之间主要有两点不同，`type` 可以作为其他类型的别名，如 `string`。`interface` 能够声明合并。

```ts
type T = string;

interface A {
	a: string;
}
interface A {
	b: string;
}
// interface A 会合并
```

</Answer>

## 如何提取类型中的字段组合成子类型？

```ts
interface Todo {
	title: string;
	description: string;
	completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
	title: "Clean room",
	completed: false,
};
```

<Answer>

```ts
type MyPick<T, K extends keyof T> = {
	[P in K]: T[P];
};
```

</Answer>

## 如何实现 Readonly？

<Answer>

```ts
type MyReadonly<T> = {
	readonly [P in keyof T]: T[P];
};
```

</Answer>

## 如何实现内置的 Exclude?

<Answer>

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

</Answer>

## 如何提取数组中第一个元素的类型？

<Answer>

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

</Answer>

## 如何获得数组长度？

<Answer>

```ts
type Length<T extends any[]> = T["length"];
```

</Answer>

## 如何在类型数组中实现 `Concat` ?

<Answer>

```ts
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];
```

</Answer>

## 如何在类型系统中实现 `Array.includes`？

<Answer>

```ts
type Includes<T extends unknown[], U> = U extends T[number] ? true : false;
```

</Answer>

## 如何将联合类型转为交叉类型？

<Answer>

```ts
type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
```

</Answer>
