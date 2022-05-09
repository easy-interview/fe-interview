---
title: 困难
---

## Vue2 是如何实现数据响应式和双向绑定的？

<Answer>

初始化时 vue 会对数据进行 `observe` 数据对象的 `__ob__` 属性设置为 Observer 对象，每个 Observer 对应一个 `Dep` 对象。

然后给数据对象的每个属性进行响应式处理（`defineReactive`），每个属性对应一个新的 `Dep` 对象（如果对象的属性值是对象，则会再次的进行 `observe` 递归处理）。

Vue2 是通过 `Object.defineProperty` 拦截对象属性的 `set` 和 `get`。在 `get` 时进行依赖收集，会把当前的 `Watcher` 加入到属性对应的 `Dep` 对象中，如果该属性值是一个对象则也会加入到子对象的 `__ob__.dep` 中。在 `set` 时就会调用属性对应 `dep` 对象的 `notify` 方法，它会遍历 `watcher` 数组，通知它们进行更新操作。

Vue2 中组件的渲染函数对应于一个 `Watcher`，当组件渲染函数进行渲染时会进行依赖收集，将当前 `Watcher` 设置为自己，这样渲染函数获取的数据对象属性时，就知道是哪个 `Watcher` 对象在获取自己，记录这个 `Watcher` 对象，这样当属性发生变化时就知道通知哪些 `Watcher` 了。

</Answer>

## 说一说 Vue2 中的 Diff 算法的理解？

<Answer>

Vue2 中每个组件对应一个 `Watcher`，当组件的响应式数据发生变化时，将会触发 DOM 更新，组件不知道哪里需要更新，这是就需要对两个虚拟 DOM 进行 Diff 操作，找到需要更新的点。

Vue2 执行 Diff 时会将上一次渲染虚拟 DOM 结果与新的渲染结果进行比对，此过程也成为 `patch`。Diff 过程是深度优先、同层比较的，两个节点会根据它们是否有子节点或文本节点做不同操作。
对于双方子节点都是数组时，会使用 4 个指针分别指向新老数组的两端，进行首首，尾尾，首尾，尾首 4 次比较，两端指针向中间靠拢。如果没有找到相同节点才按照普通方式便利寻找。

</Answer>

## Vue3 在编译上做了哪些优化？

<Answer>

1. 静态提升，编译时会将不会改变的对象进行提升，这样每次渲染时都会使用同一个对象，而不会每次都创建一个新的虚拟 DOM。
2. 动态节点属性记录，编译时编译器会记录节点哪些属性和内容是动态的会发生变化，这样 `patch` 时，就可以精准比对相应属性。
3. 事件缓存，vue3 中会将模板中的事件处理器进行缓存，这样每次渲染时都不会创建的事件监听器函数。
4. 块优化，编译器会将动态的节点单独存起来，这样在 `patch` 时就无需遍历每个子节点。

</Answer>

## Vue3 是如何实现数据响应式的？

<Answer>

Vue3 中用 `reactive` 函数会使用 Proxy 对数据对象进行响应式处理，当数据对象属性被获取时进行 `track` 操作找到访问当前属性的 `effect` 函数，当属性被修改时则会重新调用 track 的 `effect` 函数。

Vue3 中组件的渲染函数会被 `effect` 函数包裹，并且还会自动执行一下渲染函数，这样就可以触发数据对象的依赖收集，依赖收集 `track` 时会使用一个 `WeakMap` 来关联数据属性和对应的 `effect` 函数之间的关系，`WeakMap{ [key 是数据对象]: Map{ [key 是数据对象对应的属性名]: Set[effect 函数 ] } }`。在属性值变化时就会从 `WeakMap` 中获取对应的 `effect` 函数并进行调用。

</Answer>

## Vue3 中 Diff 算法是如何实现的？

<Answer>

Diff 算法主要是比对两个新老虚拟机节点数组。在比对两个数组时，首先会掐头去尾，去除首尾相同的节点，为了最少的移动 vue3 会找到最长递增子序列，然后将其他剩余的节点相对于递增子序列进行新增、移动和删除即可。

</Answer>