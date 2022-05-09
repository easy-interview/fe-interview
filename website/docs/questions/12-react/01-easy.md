---
title: 简单
---

## 说一下 Component 和 PureComponent 的区别?

<Answer>

当使用 component 时，父组件的 `state` 或 `prop` 更新时，无论子组件的 `state`、`prop` 是否更新，都会触发子组件的更新，这会形成很多没必要的 `render`，浪费很多性能；`pureComponent` 的优点在于 `pureComponent` 在 `shouldComponentUpdate` 只进行浅层的比较，只要外层对象没变化，就不会触发 `render`，减少了不必要的 `render`。

</Answer>

## Redux 中异步的请求怎么处理？

<Answer>

redux 异步流中间件其实有很多，当下主流的异步中间件有两种 `redux-thunk`、`redux-saga`。它们主要是增强 `dispatch` 函数，如果是异步任务它们会拦截 `dispatch` ，等待异步任务结束再进行 `dispatch`。

</Answer>

## Mobx 和 Redux 有什么区别？

<Answer>

Mobx是一个透明函数响应式编程（Transparently Functional Reactive Programming，TFRP）的状态管理库。Mobx 的流程通常是触发 `action`，在 `action` 中修改 `state`，通过 `computed` 拿到 `state` 的计算值，自动触发对应的 `reactions` ，这里包含 `autorun`，渲染视图等。有一点需要注意，相对于 react 来说，mobx 没有一个全局的状态树，状态分散在各个独立的 `store` 中。Mobx 的工作原理非常简单，使用 `Proxy` 或 `Object.defineProperty` 来拦截对数据的访问，一旦值发生变化，将会调用 react 的 `render` 方法来实现重新渲染视图的功能或者触发 `autorun` 等。

Redux更多的是遵循函数式编程（Functional Programming, FP）思想。redux 使用不可变状态，这意味着状态是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数，mobx 中的状态是可变的，可以直接对其进行修改。mobx 中有更多的抽象和封装，调试会比较困难，同时结果也难以预测，而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

</Answer>

## 对 React Hook 的理解?

<Answer>

hook 主要是解决长时间使用和维护 react 过程中常遇到的问题，例如：
- 难以重用和共享组件中的与状态相关的逻辑
- 逻辑复杂的组件难以开发与维护，当我们的组件需要处理多个互不相关的 local state 时，每个生命周期函数中可能会包含着各种互不相关的逻辑在里面

Hook 会让代码更容易复用且聚合。

</Answer>


## React 高阶组件是什么？

<Answer>

高阶组件(HOC) 就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件，它只是一种模式，这种模式是由 react 自身的组合性质必然产生的。

我们将它们称为纯组件，因为它们可以接受任何动态提供的子组件，但它们不会修改或复制其输入组件中的任何行为。

HOC 主要用例：
- 代码复用，逻辑抽象化
- 渲染劫持
- 抽象化和操作状态（state）
- 操作属性（props）

</Answer>

## ReactRouter 里的 Link 标签和 a 标签有什么区别？

<Answer>

如果有 click 事件 Link 会使用 click 事件，否则会禁掉 a 标签的默认事件 `event.preventDefault()`，同时使用 `history.push` 或 `history.replace` 来改变页面。

</Answer>
