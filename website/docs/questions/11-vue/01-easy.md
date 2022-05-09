---
title: 简单
---

## v-show 与 v-if 有什么区别？

<Answer>

`v-if` 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建，也是惰性的，如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 `display` 属性进行切换。

</Answer>

## 父组件和子组件生命周期钩子执行顺序？

<Answer>

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 渲染顺序：先父后子，完成顺序：先子后父
- 更新顺序：父更新导致子更新，子更新完成后父
- 销毁顺序：先父后子，完成顺序：先子后父

1. 加载渲染过程
  > 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
2. 子组件更新过程
  > 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
3. 父组件更新过程
  > 父 beforeUpdate -> 父 updated
4. 销毁过程
  > 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

</Answer>

## 父组件可以监听到子组件的生命周期吗？

<Answer>

可以，父组件可以以 `hook:` 为前缀，后面跟着生命周期钩子名字即可。

```html
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...  
```

</Answer>

## 直接给一个数组项赋值，能检测到吗？

<Answer>

由于 `Object.defineProperty` 的限制，Vue 不能检测到以下数组的变动：

当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一个问题，Vue 提供了以下操作方法：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

可以用数组的 `splice` 方法是因为 Vue 重写了这个数组方法。

</Answer>

## 为什么 Vue data 必须是函数?

<Answer>

因为 Vue 组件是可以复用的，如果 Vue `data` 是一个对象，那么在组件复用时，各个组件都共享同一个 `data` 对象，各个组件之间将会互相印象。
如果是 `data` 函数，每次创建一个组件实例 `data` 函数都会返回一个全新的数据对象。

</Answer>
