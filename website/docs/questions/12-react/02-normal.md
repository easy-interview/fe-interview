---
title: 中等
---

## React 事件机制？

<Answer>

React 并不是将事件绑定到真实 DOM 上，而是在 React 树的 Root DOM 处监听了所有的事件，当事件发生并且冒泡到 Root DOM 的时候，React 将事件内容封装并交由真正的处理函数运行。
这样的方式不仅仅减少了内存的消耗，还能在组件挂在销毁时统一订阅和移除事件。

除此之外，冒泡到 Root DOM 上的事件也不是原生的浏览器事件，而是由 react 自己实现的合成事件（SyntheticEvent）。因此如果不想要是事件冒泡的话应该调用 `event.preventDefault()` 方法，而不是调用 `event.stopPropagation()` 方法。

合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力。

对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 Root DOM 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到 Root DOM 上合成事件才会执行。

</Answer>

## useEffect 与 useLayoutEffect 的区别？

<Answer>


`useEffect` 与 `useLayoutEffect` 两者都是用于处理副作用，底层都是实现是一样的。它们的区别是 `useLayoutEffect` 会在 DOM 变更之后同步执行，主要用于处理 DOM 操作、调整样式、避免页面闪烁等问题。也正因为是同步处理，所以需要避免在 useLayoutEffect 做计算量较大的耗时任务从而造成阻塞。

`useEffect` 是按照顺序执行代码的，改变屏幕像素之后执行（先渲染，后改变DOM），当改变屏幕内容时可能会产生闪烁，`useLayoutEffect` 是改变屏幕像素之前就执行了（会推迟页面显示的事件，先改变DOM后渲染），不会产生闪烁。`useLayoutEffect` 总是比 `useEffect` 先执行。

</Answer>

## 对 Virtual DOM 的理解?

<Answer>

Virtual DOM 是一个普通 JS 对象，通过对象的方式来表示DOM结构。将页面的状态抽象为JS对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。

另外 JS 对 DOM 的操作是非常耗时的，通过 JS 对象模拟 Virtual DOM 可以降低 DOM 的操作提升性能

</Answer>

## Redux 原理及工作流程？

<Answer>

Redux 使用函数式编程思想。由老的 State、纯函数 Reducer 和 Action 来生成新的 State，并且当状态修改时通知订阅者。

用户需要创建一个 `store` 后，需要提供 Reducer 函数它接收上一个 state 和 action 来生成新的 state，当用户要修改 state 时，需要 dispatch 一个 action，始得 Reducer 开始执行生成新的 state。

</Answer>

## ReactRedux 的实现原理？

<Answer>

ReactRedux 利用 React 的 Context 功能传递 Redux 的 store，在 Provider 中创建 Subscription 实例，当用 connect 方法包装组件时，也会创建 Subscription 实例它会订阅父级的 Subscription。

当状态变更时会一级一级的向下通知，然后比对组件接受的数据，如果修改则强制更新组件。

</Answer>


## ReactRouter 的实现原理？

<Answer>

ReactRouter 分为 react-router 和 react-router-dom，react-router 依赖 history 库来实现路由跳转和监听路有变化（history 内部是使用浏览器 history API 和监听 popstate 和 hashchange 事件）。react-router-dom 实现了 Router、Route 等 React 组件。

ReactRouter 利用 React Context 功能来实现数据共享，Router 提供数据 Route 组件接受数据并计算路由 match，然后再提供 Provider 组件来覆盖 Router 组件提供的内容，这样 Route 下的组件就能获取到此 Route 组件匹配到的 match 信息，Route 渲染对应组件的顺序是 children、component 和 render。

</Answer>
