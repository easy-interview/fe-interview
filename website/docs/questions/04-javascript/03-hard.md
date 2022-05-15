---
title: 困难
---

## 为什么 JS 浮点计算会丢失精度？底层是如何用二进制表示浮点数的？如何正确的比较两个浮点数相等？

<Answer>

JS 中所有数字，无论是整数还是小数都只有一种类型 `Number`。遵循 IEEE 754 标准，
在程序内部 `Number` 类型实质是一个 64 位固定长度的浮点数，也就是标准 `double` 双精度浮点数。

- 其中由 1 个符号位 S，`0` 代表正数，`1` 代表负数
- 11 个指数位 E，用于表示次方数
- 52 个尾数位 M，超出的部分自动进一舍零，二进制默认整数位为1舍去

IEEE 浮点数格式使用科学计数法表示实数。以 `8.75` 来举例，其中整数部分 `8` 对应的二进制为 `1000`。小数转二进制具体步骤为，将该数字乘以 `2`，取出整数部分作为二进制表示的第 1 位，然后再将小数部分乘以2，将得到的整数部分作为二进制表示的第 `2` 位，以此类推，直到小数部分为 `0`。

```js
0.75 * 2 = 1.5 // 记录 1
0.5 * 2 = 1 // 记录 1
// 0.75对应的二进制为11
```

按照小数部分转换规则，精度丢失是当出现无限循环的时候，例如下面这样。

```js
// 0.1 二进制演算过程如下
0.1 * 2 = 0.2 // 取整数位 记录0
0.2 * 2 = 0.4 // 取整数位 记录00
0.4 * 2 = 0.8 // 取整数位 记录000
0.8 * 2 = 1.6 // 取整数位 记录0001
0.6 * 2 = 1.2 // 取整数位 记录00011
0.2 * 2 = 0.4 // 取整数位 记录000110
0.2 * 2 = 0.4 // 取整数位 记录0001100
0.4 * 2 = 0.8 // 取整数位 记录00011000
0.8 * 2 = 1.6 // 取整数位 记录000110001
0.6 * 2 = 1.2 // 取整数位 记录0001100011
... // 如此循环下去
0.1 = 0.0001100110011001...
```

`0.1` 无法精准表示，JS 中存储的是一个近似值，这也就是为什么 `0.1 + 0.2 !== 0.3`。

```js
// 0.1 和 0.2 都转化成二进制后再进行运算
0.00011001100110011001100110011001100110011001100110011010 +
0.0011001100110011001100110011001100110011001100110011010 =
0.0100110011001100110011001100110011001100110011001100111
// 转成十进制正好是 0.30000000000000004
```

另外 JS 中的 `0.3` 不是真实的 `0.3`，也是一个近似值。

```js
0.3000000000000000055 === 0.3 // true
0.3000000000000000055 === 0.3000000000000000051 // true
```

在双精度的浮点下，整数部分+小数部分的位数一共有 17 位。

ES6 在 `Number` 对象上面，新增一个极小的常量 `Number.EPSILON`。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。

```js
Number.EPSILON === Math.pow(2, -52 // true
```

`Number.EPSILON` 实际上是 JS 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

我们可以将 `Number.EPSILON` 看成一个可以接受的最小误差范围。

```js
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true
1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```

这样就可以让 `0.1 + 0.2 === 0.3` 了。

</Answer>

## 如何使用实现深度克隆？

<Answer>

```js
// 第一种方法使用结构化克隆
structuredClone(obj)

// 第二种使用 JSON 转换
JSON.parse(JSON.stringify(obj))

// 第三种自己实现
// 自己实现思路是，基本类型直接复制，引用类型递归复制
// 另外还要维护一个映射表防止循环引用
function deepClone(origin, target, hash = new WeakMap()) {
    //origin:要被拷贝的对象
    // 需要完善，克隆的结果和之前保持相同的所属类
    var target = target || {};

    // 处理特殊情况
    if (origin == null) return origin;  //null 和 undefined 都不用处理
    if (origin instanceof Date) return new Date(origin);
    if (origin instanceof RegExp) return new RegExp(origin);
    if (typeof origin !== 'object') return origin;  // 普通常量直接返回

    //  防止对象中的循环引用爆栈，把拷贝过的对象直接返还即可
    if (hash.has(origin)) return hash.get(origin);
    hash.set(origin, target)  // 制作一个映射表

    // 拿出所有属性，包括可枚举的和不可枚举的，但不能拿到symbol类型
    var props = Object.getOwnPropertyNames(origin);
    props.forEach((prop, index) => {
        if (origin.hasOwnProperty(prop)) {
            if (typeof (origin[prop]) === "object") {
                if (Object.prototype.toString.call(origin[prop]) == "[object Array]") {
                    //数组                            
                    target[prop] = [];
                    deepClone(origin[prop], target[prop], hash);
                } else if (Object.prototype.toString.call(origin[prop]) == "[object Object]") {
                    //普通对象 
                    target[prop] = {};

                    deepClone(origin[prop], target[prop], hash);
                } else if (origin[prop] instanceof Date) {
                    // 处理日期对象
                    target[prop] = new Date(origin[prop])
                } else if (origin[prop] instanceof RegExp) {
                    // 处理正则对象
                    target[prop] = new RegExp(origin[prop])
                } else {
                    //null                                                
                    target[prop] = null;
                }
            } else if (typeof (origin[prop]) === "function") {
                var _copyFn = function (fn) {
                    var result = new Function("return " + fn)();
                    for (var i in fn) {
                        deepClone[fn[i], result[i], hash]
                    }
                    return result
                }
                target[prop] = _copyFn(origin[prop]);
            } else {
                //除了object、function，剩下都是直接赋值的原始值
                target[prop] = origin[prop];
            }
        }
    });

    // 单独处理symbol            
    var symKeys = Object.getOwnPropertySymbols(origin);
    if (symKeys.length) {
        symKeys.forEach(symKey => {
            target[symKey] = origin[symKey];
        });
    }
    return target;
}
```

</Answer>

## 请实现符合 A+ 规范的 Promise

<Answer>

通过这个网站可以了解到 Promise/A+ 规范的说明。 https://promisesaplus.com/

简单来说需要符合以下几点。

- `Promise` 是一个具有 `then` 方法的对象或函数，它的行为符合该规范。
- `thenable` 是一个定义了 `then` 方法的对象或函数。
- `value` 可以是任何一个合法的 JS 的值，包括 `undefined`、`thenable`、`promise`。
- `exception` 是一个异常，是在 `Promise` 里面可以用 `throw` 语句抛出的值。
- `reason` 是一个 `Promise` 里 `reject` 之后返回的拒绝原因。
- 一个 `Promise` 有三种状态：`pending`、`fulfilled`、`rejected`。
- 当状态为 `pending` 时，可以转换为 `fulfilled` 或者 `rejected`。
- 当状态为 `fulfilled` 时，就不能再变为其他状态，必须返回一个不能再改变的值。
- 当状态为 `rejected` 时，就不能再变为其他状态，必须有一个 `Promise` 被 `reject` 的原因，原因值也不能改变。

```js
const prom = new Promise((resolve, reject) => {})
prom.then(() => console.log('onFulfilled)', () => console.error('onRejected'))
```

换成代码，A+ 规范只需要实现 `Promise` 构造函数和它的 `then` 即可。

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise() {
  status = PENDING
  data = undefined // Promise 的值
  onResolvedCallback = [] // Promise resolve 时的回调函数
  onRejectedCallback = [] // Promise rejected的回调函数集

  constructor(executor) {
    const resolve = (value) => {
      if (value instanceof Promise) return value.then(resolve, reject)
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = FULFILLED;
          this.data = value;
          for (let i = 0, l = this.onResolvedCallback.length; i < l; i++) {
            this.onResolvedCallback[i](value);
          }
        }
      }, 0)
    }

    const reject = (reason) => {
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = REJECTED;
          this.data = reason;
          for (let i = 0, this.onRejectedCallback.length; i < l; i++) {
            this.onRejectedCallback[i](reason);
          }
        }
      }, 0)
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    let promise2; // then 方法每次要返回一个新的 Promise

    // 根据规范，如果then的参数不是function，则需要忽略它
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : x => x;
    onRejected = typeof onRejected === "function" ? onRejected : e => {throw e};

    if (this.status === FULFILLED) {
      // 如果 promise 状态确定为 fulfilled，调用 onFulFilled
      // 但代码执行中可能会抛出，所以将其包裹在 try/catch 代码块中
      return promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            resolvePromise(promise2, onFulfilled(this.data), resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }

    if (this.status === REJECTED) {
      return promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            resolvePromise(promise2, onRejected(self.data), resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }

    if (this.status === PENDING) {
      return promise2 = new Promise((resolve, reject) => {
        this.onResolvedCallback.push((value) => {
          try {
            resolvePromise(promise2, onFulfilled(this.data), resolve, reject)
          } catch (e) {
            reject(e)
          }
        });
        this.onRejectedCallback.push((reason) => {
          try {
            resolvePromise(promise2, onRejected(this.data), resolve, reject)
          } catch (e) {
            reject(e)
          }
        });
      })
    }
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // x 是用户在 then 函数中返回的值
  let then;
  let thenCalled = false
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  if (x instanceof Promise) {
    if (x.status === PENDING) {
      x.then((v) => {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 检测用户返回的是不是 Promise，如果是则接着 resolve
      if (typeof x.then === 'function') {
        x.then((y) => {
          if (thenCalled) return // 防止被多次调用
          thenCalled = true
          return resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (thenCalled) return
          thenCalled = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if (thenCalled) return
      thenCalled = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}
```

实现完成过后可以使用 https://github.com/promises-aplus/promises-tests 来跑单元测试，要是全部通过则表示实现成功。

</Answer>

## CommonJS 和 ES Module 有什么区别？

<Answer>

JS 现在有两种模块，一种是 ES6 模块，简称 ESM，另一种是 CommonJS 模块，简称 CJS。

CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。语法上面，两者最明显的差异是，CommonJS 模块使用 `require()` 和 `module.exports`，ES6 模块使用 `import` 和 `export`。它们采用不同的加载方案。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 [ES6 模块支持](https://nodejs.org/api/packages.html)。


- ES Module 会自动采用严格模式，不管你有没有在模块头部加上 `"use strict"`。
- CommonJS 模块输出的是一个值的拷贝（值的缓存，不存在动态更新），ES6 模块输出的是值的引用（可以取到模块内部实时的值）。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 `require()` 是同步加载模块，ES6 模块的 `import` 命令是异步加载，有一个独立的模块依赖的解析阶段。

另外 ES 2020 中引入 `import()` 函数，支持动态加载模块。`import()` 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。`import()` 函数与所加载的模块没有静态连接关系，这点也是与 `import` 语句不相同。`import()` 类似于 Node 的 `require` 方法，区别主要是前者是异步加载，后者是同步加载。

</Answer>

## 说一说 CommonJS 是如何解决循环依赖的？

<Answer>

CommonJS 的一个模块，就是一个脚本文件。`require` 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

以后需要用到这个模块的时候，就会到 `exports` 属性上面取值。即使再次执行 `require` 命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

CommonJS 模块的重要特性是加载时执行，即脚本代码在 `require` 的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。例如下面这样。

```js
// a.js
exports.done = false; // 导出 done = false
var b = require('./b.js'); // 中断执行，去加载执行 b.js
console.log('在 a.js 之中，b.done = %j', b.done); // 3. 在 a.js 之中，b.done = true
exports.done = true;
console.log('a.js 执行完毕'); // 4. a.js 执行完毕

// b.js
exports.done = false;
var a = require('./a.js'); // 这时候 a.js 是执行到一半的
console.log('在 b.js 之中，a.done = %j', a.done); // 1. 在 b.js 之中，a.done = false
exports.done = true;
console.log('b.js 执行完毕'); // 2. b.js 执行完毕

// main.js
var a = require('./a.js'); // 首先加载 a.js
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
// 在 main.js 之中, a.done=true, b.done=true
```

</Answer>

## 说一说 ES Module 是如何解决循环依赖的？

<Answer>

ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，需要开发者自己保证，真正取值的时候能够取到值。

```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';

// a.mjs
// ReferenceError: foo is not defined
```

上面代码会报错是因为，首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。接着，执行b.mjs的时候，已知它从a.mjs输入了 `foo` 接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。执行到第三行 `console.log(foo)` 的时候，才发现这个接口根本没定义，因此报错。

解决这个问题的方法，就是让 b.mjs 运行的时候，`foo` 已经有定义了。这可以通过将 `foo` 写成函数来解决，利用函数的提升作用。

```js
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};

// $ node --experimental-modules a.mjs
// b.mjs
// foo
// a.mjs
// bar
```

</Answer>

## V8 引擎是如何进行垃圾回收的？

<Answer>

V8 引擎会使用到分代回收、空间复制、标记清楚、标记整理、标记增量等 GC 算法。另外 V8 内存空间是由上限的一般为 1.5G 或 800M。

V8 的内存空间一分为二，分为新生代空间和老生代空间。
新生代空间存储存活时间较短的对象，一般空间大小为 32M 或 16M。
老生代空间存放存活时间较长的对象，一般空间大小为 1.4G 或 700M。

新生代内存会被分为两个相等大小的空间，使用中 `From` 和空闲 `To`，
新生代回收过程使用复制算法+标记整理，它会将活动对象存储与 From 空间，标记整理后将活动对象拷贝到 To 空间，然后 From 与 To 空间进行交换，从而释放内存。在拷贝过程中如何一个对象在一轮 GC 中还存活或者 To 空间使用率大于 25%，则直接拷贝到老生代空间。

老生代主要使用标记清楚、标记整理和增量标记算法。首先使用标记清除进行垃圾回收，如果老生代空间存放不下新对象时则会触发标记整理进行空间优化，因为垃圾回收会阻塞 JS 执行，所以增量标记，会让标记算法不会一次执行完毕，会和 JS 执行相互交换执行。

</Answer>
