---
title: 简单
---

## JS 中的 undefined 和 ReferenceError: xxx is not defined 有什么区别？

<Answer>

ReferenceError：当尝试引用一个未定义的变量/函数时，就会抛出 ReferenceError。
undefined：当一个变量声明后，没有被赋值，那么它就是 undefined 类型。

</Answer>

## JS 有哪几种方式可以判断类型，以及各个方法的优缺点是什么？

<Answer>

1. `typeof` 可以对基本类型做出准确的判断，但对于引用类型就不行了，例如 `typeof new String('1')` 和 `typeof null` 都是返回 `object`。

2. `instanceof` 判断对象和构造函数在原型链上是否有关系，如果有关系，返回真，否则返回假。对于基本类型无效，例如 `'1' instanceof String` 返回 `false`。

3. `Object.prototype.toString` 可以准确的判断类型，是最准确的方式。`Object.prototype.toString.call('')` 返回 `[object String]`。

</Answer>

## 说一说对 JS 原型链的理解？

<Answer>

JS 分为函数对象和普通对象，每个对象都有 `__proto__` 属性，但是只有函数对象才有 `prototype` 属性

构造函数的 `prototype` 属性也称为的原型，通过 `new` 创建实例对象时，该对象的  `__proto__` 属性指向构造函数的 `prototype` 属性，而 `prototype` 也是一个对象，它有 `constructor` 属性指向构造函数，同样它也有 `__proto__` 属性 。

当从实例对象访问一个属性时，如 `obj.a`，首先会从该对象上寻找，如果不存在就在其 `__proto__` 上寻找，也就是构造函数的 `prototype` 对象，如果还没找到就会通过 `__proto__.__proto__` 属性一直向上寻找，直到找到或到达最顶层。

普通对象的 `__proto__` 是指向 `Object.prototype` 的，这也是为什么普通对象会有 `toString` 等方法的，而 `Object.prototype` 的 `__proto__` 是指向 `null` 的。

函数的 `__proto__` 是指向 `Function.prototype` 的， `Function.prototype.__proto__` 是指向 `Object.prototype` 的。
需要注意的是 `Function.prototype` 是一个函数。这是因为在 ES5 中会将类的 `prototype` 设置为它实例，例如 `Object.prototype` 是一个 Object 对象，`Array.prototype` 是一个数组，`String.prototype` 是一个空字符串。

</Answer>

## 说一说对 JS 闭包的理解？

<Answer>

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行的。

闭包是指有权访问另一个函数作用域中变量的函数。创建闭包最常见的方式就是，在一个函数内部创建另一个函数。

</Answer>

## 什么是作用域链？

<Answer>

1. 作用域，即变量（变量作用域又称上下文）和函数生效（能被访问）的区域或集合，换句话说，作用域决定了代码区块中变量和其他资源的可见性。

一般将作用域分成：
- 全局作用域，任何不在函数中或是大括号中声明的变量，都是在全局作用域下，全局作用域下声明的变量可以在程序的任意位置访问
- 函数作用域，函数作用域也叫局部作用域，如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问
- 块级作用域，ES6 引入了 let 和 const 关键字，和 var 关键字不同，在大括号中使用 let 和 const 声明的变量存在于块级作用域中。在大括号之外不能访问这些变量

2. 词法作用域，词法作用域，又叫静态作用域，变量被创建时就确定好了，而非执行阶段确定的。也就是说我们写好代码时它的作用域就确定了。

3. 作用域链，当在 JS 中使用一个变量的时候，首先 JS 引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域，如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错

</Answer>

## 在 new 一个对象实例时，new 在对象操作的过程中具体做了什么？

<Answer>

1. 创建一个新对象
2. 然后将新对象的 `__proto__` 指向构造函数的原型
3. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
4. 执行构造函数中的代码（为这个新对象添加属性）
5. 返回新对象

</Answer>

## 如何确保你的构造函数只能被 new 调用，而不能被普通调用？

<Answer>

可以通过 `this` 是否是当前类实例来判断，代码如下：

```js
function Person(firstName, lastName) {
  if (!(this instanceof Person)) {
    throw new TypeError('Function constructor A cannot be invoked without "new"')
  }
}
```

在 ES6 中新加入 `new.target` 属性，如果是使用 new 关键字来创建实例，该属性为该构造函数，否则为 `undefined`。

```js
function Person() {
  if (!(new.target)) {
    throw new TypeError('Function constructor A cannot be invoked without "new"')
  }
}
```

当然了如果使用 ES6 可以直接使用 class，ES6 中的 class 是可以直接保证只能通过 new 来初始化的。

</Answer>

## toPrecision 和 toFixed 和 Math.round 有什么区别？

<Answer>

- `toPrecision` 用于处理精度，精度是从左至右第一个不为 0 的数开始数起。
- `toFixed` 是对小数点后指定位数取整，从小数点开始数起。
- `Math.round` 是将一个数字四舍五入到一个整数。

</Answer>

## Promise.all 和 Promise.allSettled 有什么区别？

<Answer>

最大不同是 `Promise.allSettled` 永远不会被 `reject`。

使用 `Promise.allSettled`，只需专注在 `then` 语句里，当有 `promise` 被异常打断时，我们依然能妥善处理那些已经成功了的 `promise`，不必像 `all` 一眼全部重来。

</Answer>

## for...in、 for...of 和 for await...of 有什么区别？

<Answer>

`for…of` 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的 `for…in` 的区别如下：

- `for…of` 是使用对象的 `Symbol.iterator` 遍历器进行遍历，如果对象没有遍历器则会报错，例如普通对象。
- `for… in` 会遍历对象的整个原型链，性能非常差不推荐使用，而 `for … of` 只遍历当前对象不会遍历原型链
- 对于数组的遍历，`for…in` 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，`for…of` 只返回数组的下标对应的属性值

`for...in` 循环主要是为了遍历对象而生，不适用于遍历数组；`for...of` 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

`for await...of` 用于遍历异步的 Iterator 接口（`Symbol.asyncIterator`），异步遍历器的特点是 `next` 方法返回的是一个 `Promise`。

</Answer>

## Object.is() 与比较操作符 “===”、“==” 的区别？

<Answer>

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 `Object.i`s 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

</Answer>

## 谈 Object.defineProperty 与 Proxy 的区别?

<Answer>

使用 Object.defineProperty 会产生三个主要的问题：
1. 不能监听数组的变化
2. 必须遍历对象的每个属性
3. 必须深层遍历嵌套的对象

而上述问题 Proxy 全部解决，它会直接拦截

</Answer>
