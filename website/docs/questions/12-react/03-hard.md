---
title: 困难
---

## 说说对 React Fiber 的理解以及实现原理？

<Answer>

Fiber 是 React 16 中采用的新协调（reconciliation）引擎，主要目标是支持虚拟 DOM 的渐进式渲染。

之前 React 使用的是 Stack Reconciler 使用递归的方式创建虚拟 DOM，这种方式一旦开始就不能中断，
如果遇到比较大组件嵌套比较深的 React 项目，这种处理方式将会一直占用主线程，导致不能及时响应用户交互，
用用户感到当前页面非常卡顿。

新的 Fiber 协调器就来解决这个问题，Fiber 协调器采用循环的方式来处理任务，没处理完一个任务，
新的 Fiber 算法会保存当前进度，然后查看能否继续处理任务（React 实现了类似与 requestIdleCallback 调度功能），
如果可以则继续处理，不行的话则将线程交还给浏览器。
这样大大降低了浏览器响应用户的时长，给用户带来更好的使用体验。

Fiber 循环处理任务具体源码如下。

```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    // 如果当前任务要处理 并且 还可以去处理
    performUnitOfWork(workInProgress); // 处理任务
  }
}
```

`workInProgress` 就是当前在处理的任务，`performUnitOfWork` 函数中处理完这个任务，会赋值成新的任务。

整个流程是 React 首先将组件实例转换成 Fiber 节点，Fiber 节点与组件实例一一对应，构成一颗 Fiber 树，
Fiber 节点是普通的 JS 对象，Fiber 树是使用链表的方式储存节点节点关系。

例如 Fiber 节点中的 `return` 属性关联到该节点的父节点，`child` 属性关联到第一个子节点，
`sibling` 属性关联到下一个兄弟节点。

另外 Fiber 节点上还有一个 `alternate` 属性用于表示与当前节点关联的另一颗 Fiber 树上的节点。
React 中一共有两颗 Fiber 树，一个是 workInProgress 一个是 current，current 是当前使用的 Fiber 树，
workInProgress 是当前在后台处理的 Fiber 树，等 workInProgress 树处理完毕，workInProgress 和 current
会进行交换，workInProgress 变成 current，current 变成 workInProgress。

上面的 `performUnitOfWork` 函数就是接收一个 Fiber 节点进行处理，在该函数中它会比对两颗 Fiber 树，标记 Fiber 
需要进行的 DOM 操作等。

等 `workInProgress` 变量等于 `null` 时，表示已经处理完毕，下一步就是提交工作，这一步会根据 Fiber 节点上的标记进行
相对应的 DOM 操作，生命周期钩子调用，Hook 调用等，这一步操作是不能被中断的。

</Answer>

## React 是如何实现 diff 算法的？

<Answer>

React 中组件实例会转换为 Fiber 节点表示，Fiber 节点相互连接成一个 Fiber 树，
一共有两颗树，一个是当前真在使用的，一个是新生成的。React Diff 算法就发生在两颗
Fiber 树的比对上。

React Diff 算法并不会去遍历整个 Fiber 树，去寻找相同节点，这样太耗费性能，
而是同层一个一个的去比较，如果两个节点的类型不同（如 `div` 变为 `p`）则会直接重构整个节点和节点下所有子节点。
如果两个节点相同则会更新 `props`，保留 DOM 元素，更新属性等。
如果遇到多个子节点比较，例如一个节点的子节点 (a, b, c) 变为 (a, d, b, c) 这时候就会用到 `key`，
如果没有 `key`，React 会从头更新到尾，然后插入一个 c 节点，虽然我们只是插入了一个 d 节点。
这也是列表元素要加 `key` 的原因，有了 `key`，React 首选会比对前面相同的节点，然后根据剩余检点的 `key`，
生成一个 `keyMap`，然后在里面找到相同节点，如果没找则表示新增，找到了则表示移动，剩下的表示删除。
知道要进行怎样的操作 React 并不会马上进行，而是给 Fiber 节点打上相关的标签，在 Diff 完成后的提交节点再进行 DOM 操作。 

</Answer>

## React useState 是如何实现的？

<Answer>

React 的组件实例和 Fiber 节点是一对一关系，`useState` 状态就存储在 Fiber 节点中的
`memoizedState` 属性上，该属性是链表结构。这样每次函数组件重新执行时就可以获取之前存的状态了，
`useState` 返回的第二个是更新函数，该函数执行会获取与当前的组件对应的 Fiber 节点，并入队
一个新的更新任务，来更新组件。

</Answer>

## React useEffect 是如何实现的？

<Answer>

与 `useState` 类似，`useEffect` 也是将 effect 函数放到 Fiber 节点上，
它被存储到 `memoizedState` 和 `updateQueue` 中。然后最后在提交阶段的
`commitHookEffectList` 方法中被触发调用。

</Answer>

## React Context 是如何实现的？

<Answer>



</Answer>

## React 中的 lanes 是什么，它有什么作用？

<Answer>

由于 React 任务可以被中断，可能导致有些低优任务始终无法执行，
所以每个任务会有个过期时间，如果到达时间了还没执行，则会高优执行。
`lanes` 就是由过期时间演化而来，它是一个二进制数，用组合的方式，可以表示多个优先级，
例如像 `Suspense` 就需要多个优先级（children 和 fallback）。
另一个原因是因为之前任务优先级是使用比对的方式，是有顺序的，
使用 lane 可以直接使用二进制位运算（`const isTaskIncludedInBatch = (task & batchOfTasks) !== 0`）。

</Answer>

## React 使用了哪些 API 作为任务调度，为什么不使用 requestIdleCallback？

<Answer>

React 根据浏览器支持情况，按顺序分别使用 `setImmediate` 或 `MessageChannel` 或 `setTimeout`。

`setImmediate` 在 IE 和 NodeJS 中被支持，它运行的更早，而且在 NodeJS 中也不会阻止退出，而 `MessageChannel` 
触发也比 `setTimeout` 更稳定快速。

不使用 `requestIdleCallback` 是因为第一这个 API 并不是所有浏览器都支持，另外它出发频率比较低，1 秒 20 次，
React 并不光是希望空闲时间触发，而是希望尽可能快，这样才不会浪费 CPU 资源。

</Answer>

## React 异步渲染的概念，介绍 Time Slicing 和 Suspense?

<Answer>



</Answer>

## 什么是 React 18 Concurrent 渲染，它和之前的有什么不同？

<Answer>



</Answer>

## React 是如何实现本地开发时警告提示的？

<Answer>



</Answer>
