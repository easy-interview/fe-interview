---
title: 困难
---

## 实现一个通用的 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

<Answer>

```ts
type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

</Answer>

## 请在类型系统中实现 `Promise.all`

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, number, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)
```

<Answer>

```ts
declare function PromiseAll<T extends readonly any[]>(
  values: readonly [...T]
): Promise<
  {
    [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P];
  }
>;
```

</Answer>

## 请实现 Chainable

假设 key 只接受字符串而 value 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 key 只会被使用一次。

```ts
declare const config: Chainable;

const result = config
	.option("foo", 123)
	.option("name", "type-challenges")
	.option("bar", { value: "Hello World" })
	.get();

// 期望 result 的类型是：
interface Result {
	foo: number;
	name: string;
	bar: {
		value: string;
	};
}
```

<Answer>

```ts
type Chainable<T> = {
	option<P extends string, K>(key: P, value: K): Chainable<T & { [U in P]: K }>;
	get(): T;
};
```

</Answer>

## 请在类型系统中实现 Trim

<Answer>

```ts
type Trim<T> = T extends `${" " | "\n" | "\t"}${infer R}${" " | "\n" | "\t"}` ? Trim<R> : T;
```

</Answer>

## 请实现 Capitalize，将小写转为大写

<Answer>

```ts
type MyCapitalize<T> = T extends `${infer P}${infer U}`
	? `${Uppercase<P>}${U}`
	: T;
```

</Answer>

## 请实现 ReplaceAll，替换字符串

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
```

<Answer>

```ts
type ReplaceAll<
  T extends string,
  U extends string,
  P extends string
> = U extends ""
  ? T
  : T extends `${infer R}${U}${infer K}`
  ? ReplaceAll<`${R}${P}${K}`, U, P>
  : T;
```

</Answer>

## 如何给函数追加参数？

```ts
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number
```

<Answer>

```ts
type AppendArgument<T, A> = T extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : never;
```

</Answer>

## 如何获取类型中 required 的字段组成的子类型？

```ts
type T1 = GetRequired<{name: string, age: number, sex?: string}>
// {name: string, age: number}
```

<Answer>

```ts
type RequiredKeys<T> = keyof T extends infer K
  ? K extends keyof T
    ? T[K] extends Required<T>[K]
      ? K
      : never
    : never
  : never;

type GetRequired<T> = {
  [key in RequiredKeys<T>]: T[key]
};
```

</Answer>

