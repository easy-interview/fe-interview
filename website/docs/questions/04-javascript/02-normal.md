---
title: 中等
---

## 请说一说 async、await 实现原理？

<Answer>

`async` 和 `await` 相当于 `Generator` 函数的语法糖。`*` 号相当于 `async`，`yield` 相当于 `await`。

```js
var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

我们自己也可以利用 `Generator` 函数自己实现一个 `async` 函数。

```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e); 
      }
      if(next.done) {
        return resolve(next.value);
      } 
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });      
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

spawn(function* () {
  yield sleep(1000)
  console.log(1)
  yield sleep(2000)
  console.log(2)
})
```

`spawn` 函数是一个自动执行器，它会自动执行包裹的 `Generator` 函数，从而达到 `async` 函数一样的效果。

</Answer>

## 什么是防抖和节流，以及如何编码实现？

<Answer>

当一个函数执行太频繁，比如事件的回调函数。频繁的执行会对性能有影响，这时候就需要控制函数执行的频率。

防抖和节流都是控制函数执行的频率。

它们的差别是防抖不会立刻执行函数，在 n 秒内触发的函数会重新计时，也就是 n 秒内没有触发函数才会执行回调。如下所示。

```js
function debounce(fn, delay) {
    let timer;
    let args;
    return function () {
        args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
```

节流会立刻执行函数，并保证没 n 秒内只执行一次回调函数。如下所示。

```js
function throttle(fn, delay) {
  let pending = false;
  let first = true;
  let args = null;
  return function () {
    args = arguments;

    if (first) {
      first = false;
      return fn.apply(ctx, args);
    }

    if (pending) return;
    pending = true;

    setTimeout(() => {
      pending = false;
      fn.apply(this, args);
    }, delay);
  };
}
```

</Answer>

## 请简单的实现 Promise.all

<Answer>

`Promise.all` 用于并行执行多个 `Promise`，如果其中一个 `reject` 则直接失败返回。

```js
Promise.prototype.all = function(promises) {
  const results = [];
  const promisesLength = promises.length;
  let promiseCount = 0;
  return new Promise(function(resolve, reject) {
    promises.forEach(p => {
      Promise.resolve(p).then(function(res) {
        results[promiseCount] = res;
        promiseCount++;
        if (promiseCount === promisesLength) {
          resolve(results);
        }
      }, reject);
    })
  });
};
```

</Answer>

## 不借助变量交换两个数?

<Answer>

```js
// 第一种
[y, x] = [x, y]

// 第二种
x=x+y;  //x 暂存两数之和
y=x-y;  //y 为两数之和减去 y，即原来的 x
x=x-y;  //x 为两数之和减去现在的y（原来的x），变成原来的y

// 第三种
x^=y; //x先存x和y两者的信息
y^=x; //保持x不变，利用x异或反转y的原始值使其等于x的原始值
x^=y; //保持y不变，利用x异或反转y的原始值使其等于y的原始值
```

</Answer>
