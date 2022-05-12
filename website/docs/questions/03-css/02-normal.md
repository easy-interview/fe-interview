---
title: 中等
---

## 什么是 BFC （Block Formatting Contexts）？请简单说下触发条件？

<Answer>

1. BFC 是块级格式化上下文；
2. 官方解释：决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时， BFC 提供了一个环境， HTML 在这个环境中按照一定的规则进行布局。
3. 个人理解：这个是盒子开辟了自己的一个内部空间从而达到子盒子不影响父盒子其他兄弟盒子
4. 触发条件
   - 根元素 html
   - 设置浮动属性值不为 none `float: left/right/inherit`
   - 设置定位 `position: absolute/fixed`
   - 设置盒子类型 `display: inline-block, table-cell, table-caption, flex, inline-flex`
   - 设置溢出属性值不为visible `overflow: hidden/scroll/auto/inherit`
5. 开发中用来解决
   - 父盒子 margin 坍塌问题
   - 子盒子浮动父盒子坍塌问题
   - 清除浮动（子盒子浮动覆盖到父盒子的兄弟盒子）

</Answer>

## 移动端适配方案？

<Answer>

1. rem 适配
2. vw 适配
3. 主流 rem + vw适配
```html
// 禁止用户缩放
<meta name="viewport" content="width=device-width, initial-scale=2.0, maximum-scale=2.0, minimum-scale=2.0, user-scalable=no">
html {
  // 100 / 750 = 0.133333333333333vw 我们把这个适口当做100px
  // 然后除于750换算得出 1px = 0.133333333333333vw 那么整个适口等于 
  // 0.133333333333333 * 100 = 13.3333333333333vw = 100px
    font-size: 13.3333333333333vw // 100px
}
```

</Answer>

## CSS 如何实现响应式布局？

<Answer>

1. 媒体查询
2. flex布局
3. grid布局
4. float布局
5. 相对定位绝对定位布局
6. 使用单位rem/vw 和 calc() 函数

</Answer>

## em/px/rem/vh/vw 这些单位有什么区别？

<Answer>

1. 以上除了px都是相对单位，实际上px也是相对单位，但是我们通常认为他是绝对单位
2. rem是相对根节点 html 的 `font-size: 14px;`; 此时1em 等于 14px
3. em 相对父节点的 `font-size`
4. vh/vw 相对屏幕高度和宽度 1vh/1vw = 1%

</Answer>

## vue 中的`<style scope>`什么意思，怎么实现的？

<Answer>

1. 组件内的样式只在当前 vue 组件生效,实现组件的私有化，不对全局造成样式污染，表示当前 style 属性只属于当前模块;
   - 简单地说就是 该样式只作用于该组件
2. vue中的scoped属性的效果主要通过 PostCSS 转译实现，PostCSS 给一个组件中的所有 dom 添加了一个独一无二的动态属性，然后，给 CSS 选择器额外添加一个对应的属性选择器来选择该组件中 dom，这种做法使得样式只作用于含有该属性的 dom ——组件内部 dom
   - 简单说就是 对应的 dom 加了一个属性，data-v 加上生成的码，样式就可以通过属性选择对应的 dom 进行样式添加

</Answer>

## 怎么理解回流跟重绘？什么场景下会触发？

<Answer>

1. 回流：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置
   - 添加或删除可见的DOM元素
   - 元素的位置发生变化
   - 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
   - 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
   - 页面一开始渲染的时候（这避免不了）
   - 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的） 
2. 重绘：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制
   - 颜色的修改
   - 文本方向的修改
   - 阴影的修改

3. 回流和重绘都会影响性能，所以我们要尽量避免或者减少回流和重绘次数，如何提高性能
   - 如果想设定元素的样式，通过改变元素的 class 类名 (尽可能在 DOM 树的最里层)
   - 避免设置多项内联样式
   - 应用元素的动画，使用 position 属性的 fixed 值或 absolute 值
   - 避免使用 table 布局，table 中每个元素的大小以及内容的改动，都会导致整个 table 的重新计算
   - 对于那些复杂的动画，对其设置 position: fixed/absolute，尽可能地使元素脱离文档流，从而减少对其他元素的影响
   - 使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘

</Answer>

## 什么是 CSS Sprites？

<Answer>

1. 将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background-repeat，background-position 的组合进行背景定位。 利用CSS Sprites能很好地减少网页的http请求，从而大大的提高页面的性能。

</Answer>

## style标签写在body后与body前有什么区别？

<Answer>

1. 页面加载自上而下，当然是先加载样式。写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

</Answer>