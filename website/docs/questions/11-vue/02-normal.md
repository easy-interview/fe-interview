---
title: 中等
---

## Vue 中的 key 的作用和工作原理？

<Answer>

key 的作用主要是为了高效更新虚拟 DOM。

Vue 在对两个虚拟 DOM 进行 Diff 的时候，会通过 key 来比对两个节点是否属于同一个节点，如果不存在 key 则会比对两个节点的标签。
如果不存在 key 则会可能导致 Vue 将两个不同的节点认为是同一个节点，从而进行 `patchNode` 操作，增加 DOM 的操作量。

相关源码：https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js#L35

</Answer>

## Vue.extend 作用和原理？

<Answer>

`Vue.extend` 使用基础 Vue 构造器，创建一个 Vue 子类。参数是一个包含组件选项的对象。
为了性能考虑，在 `Vue.extend` 方法还会缓存已创建的子类。反复调用 `Vue.extend` 其实应该返回同一个结果。

</Answer>

## 说一说 Vue 中的组件化的理解？

<Answer>

组件是独立可复用的组织单元，它可以让开发者开发一些可复用的基础组件，然后再用这些基础组件搭建出一个大型项目，组件相互之间独立且可复用，可以大幅提高开发效率、测试性。这也是一种将一个大问题分解为若干小问题的思想。

Vue 中的组件基于配置，平时开发者编写的并非正真组件，Vue 后续会通过开发者的配置生成构造函数，它基于 `VueComponent` 扩展自 `Vue`。

</Answer>

## Vue 中 $nextTick 是如何实现的？

<Answer>

`nextTick` 在 Vue 中有两种用法，一种是作为全局方法 `Vue.nextTick` 使用，还有一种是挂载在组件实例上，通过 `vm.$nextTick` 的方式使用。作为实例方法调用的时候，回调的 `this` 自动绑定到调用它的实例上，如果浏览器支持 Promise，这个方法则会返回 Promise。在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

Vue 会异步指向传入的回调函数，根据浏览器支持的特性，Vue 会根据 `Promise -> MutationObserver -> setImmediate -> setTimeout` 的优先级来执行这个回调函数。

该函数会将回调函数塞进一个数组，这样在 `nextTick` 执行前，传入的回调函数将会直接加入数组。

</Answer>

## 说一下 Vue 的 keep-alive 是如何实现的，具体缓存的是什么？

<Answer>

`keep-alive` 是 vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM。

该组件会在 `render` 的时候获取第一个子组件实例，并判断是否需要缓存，如果需要缓存但是没有缓存，会将组件实例 `data.keepAlive` 属性设置为 `true`，并且在 `keep-alive` `mounted` 或 `updated` 时将组件实例设置到自己缓存属性中。

组件初始化，更新和卸载时会判断 `keepAlive` 属性，如果为 true，则会 patch 更新和调用相关钩子函数。

</Answer>

## Proxy 与 Object.defineProperty 优劣对比？

<Answer>

`Proxy` 可以直接监听对象而非属性，直接监听数组的变化和删除属性，并且无需遍历对象每个属性，但是不兼容 IE 11。

`Object.defineProperty` 无法监听数组的变化，必须遍历对象的每个属性，兼容性好，支持IE9。

</Answer>

## 虚拟 DOM 实现原理？

<Answer>

浏览器资源开销最大便是 DOM 节点，DOM 操作很慢，网页性能问题大多数都是有 JS 修改 DOM 所引起的。
虚拟 DOM 是用 JS 模拟 DOM 树，并渲染这个 DOM 树，比较新老 DOM 树，得到比较的差异对象，把差异对象应用到渲染的 DOM 树。

</Answer>

## Vue3 对比 Vue2 有那些新特性和优化？

<Answer>

1. `hoistStatic` 静态提升，Vue3 会将不会改变的静态节点进行缓存，这样可以避免重复创建。
2. 生成的虚拟 DOM 更加详细，在 patch 的时候将会判断是否需要更新。
3. 事件侦听器缓存，Vue3 中提供的事件缓存对象，当 `cacheHandlers` 开启，会自动生成一个内联函数，同时生成一个静态节点。当事件再次触发时，只需从缓存中调用即可，无需再次更新。
4. 更先进的组件，vue2 中组件必须有一个根节点。vue3 则没这个要求，它会自动创建一个虚拟的 Fragment 节点。
5. 按需编译，在 Vue 3 中，通过将大多数全局 API 和内部帮助程序移至 ES 模块导出来，实现了这一目标。这使现代的打包工具可以静态分析模块依赖性并删除未使用的导出相关的代码。
6. 基于 Proxy 的响应式系统，数据初始化无需进行遍历，性能提升 100%，可以拦截数组的和属性的增加和删除操作。
7. Composition API，带来更好的逻辑复用和编程体验。

</Answer>

## Composition 和 Options API 有什么区别？

<Answer>

- Options API：在一个 vue 文件中 methods，computed，watch，data 中等等定义属性和方法，共同处理页面逻辑。
- Composition API：根据逻辑相关性组织代码的，提高可读性和可维护性。

Composition API优势：根据逻辑相关性组织代码，提高可读性和可维护性，基于函数组合的 API 更好的重用逻辑代码，对 tree-shaking 友好。

</Answer>

## vue-router 的实现原理？

<Answer>

vue-router 有 3 种路由类型，分别是 hash、history 和 memory。分别用于通过 url hash 跳转、url 路径跳转和在内存中跳转（SSR）。

hash 模式是通过 `hashchange` 事件来监听 hash 变化从而进行页面跳转。

history 模式是通过 history API 和监听 `popstate` 事件来实现页面跳转。

</Answer>

## vuex 的实现原理？

<Answer>

Vuex 内部是通过创建一个新的 Vue 实例来实现数据响应式的，会把传入的 `state` 放入 Vue 的 data 中，getters 变为 computed 属性。

```js
store._vm = new Vue({
  data: { state },
  computed
})
```

它在安装的时候会通过混入，将自己在 Vue 组件实例初始化时（init 或 beforeCreate）设置给 `$store` 属性。 

</Answer>

## Pinia 的实现原理？

<Answer>



</Answer>
