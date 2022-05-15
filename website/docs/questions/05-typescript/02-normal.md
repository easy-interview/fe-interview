---
title: 中等
---

## 什么是三斜线指令？有哪些三斜杠指令？

<Answer>

三斜线指令是单行注释，包含用作编译器指令的 XML 标记。每个指令都表示在编译过程中要加载的内容。三斜杠指令仅在其文件的顶部工作，并且将被视为文件中其他任何地方的普通注释。

- `/// <reference path=”…” />` 是最常见的指令，定义文件之间的依赖关系。
- `/// <reference types=”…” />` 类似于path但定义了包的依赖项。
- `/// <reference lib=”…” />` 允许显式包含内置lib文件。

</Answer>

## 说说对 TypeScript 中命名空间与模块的理解？以及它们有什么区别？

<Answer>

在 TS 中如果一个文件不带有顶级的 `import` 或者 `export` 声明，那么它的内容被视为全局可见的。

如果两个 TS 文件的内容如下，则会报错提示重复声明 `a` 变量，因为 `a` 是全局可以见的。

```ts
const a = 1
```

包含顶级 `import` 或者 `export` 的文件都被当成一个模块。只需要将上面代码加上 `import` 或 `export` 就可以解决报错。

而命名空间最明确的目的就是解决重名问题，命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的。

```ts
namespace SomeNameSpaceName {
	export interface ISomeInterfaceName {}
	export class SomeClassName {}
}

// SomeNameSpaceName.SomeClassName 使用方式
```

</Answer>

## TS 中的 any 和 unknown 有什么区别？

<Answer>

`any` 表示放弃类型系统，它表示是任何类型，任何值可以赋值给它（top type），它也可以赋值给任何类型（bottom type）。

`unknown` 表示是不知道是什么类型，任何值可以复制给它（top type），但是它不能赋值给任何类型。unknown 类型会更加严格。

```ts
const a: unknown = 1;
const b: string = a; // 报错

const a: any = 1;
const b: string = b;
```

</Answer>

## 请说说 TS 中 never 的理解

<Answer>

`never` 类型仅能被赋值给另外一个 `never`，表示不应该出现的类型。它一般用于函数的返回值，例如一个函数会抛出异常或函数中有 `while(true)` 一直执行不会结束。

```ts
function foo(x: string | number): boolean {
  if (typeof x === 'string') {
    return true;
  } else if (typeof x === 'number') {
    return false;
  }

  // 如果不是一个 never 类型，这会报错：
  // - 不是所有条件都有返回值 （严格模式下）
  // - 或者检查到无法访问的代码
  // 但是由于 TypeScript 理解 `fail` 函数返回为 `never` 类型
  // 它可以让你调用它，因为你可能会在运行时用它来做安全或者详细的检查。
  return fail('Unexhaustive');
}

function fail(message: string): never {
  throw new Error(message);
}
```

还可以利用它做类型受收窄。

```ts
interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

type All = Foo | Bar

function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
			// 表示不应该到在这里
      const exhaustiveCheck: never = val
      break
  }
}

// 如果把 All 多加了个子类型
type All = Foo | Bar | Baz

// 那么 handleValue 就会报错，Baz 不能赋值给 never。
```

</Answer>

## TS 类型中 infer 关键字表示什么意思？

<Answer>

`infer` 主要用于推断待推断的类型，提取未知类型。

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// 这里表示如果 T 是一个 ((...args: any[]) => infer R) 类型函数，则提取它的返回值类型否则返回 any

type Func = () => User;
type Test = ReturnType<Func>; // Test = User
```

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
