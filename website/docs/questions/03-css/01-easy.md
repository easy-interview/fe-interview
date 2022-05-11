---
title: 简单
---

## 页面导入样式时，使用 `link` 和 `@import` 有什么区别？

<Answer>

1. link是xhtml标签，除了加载css外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS
2. link引用CSS时候，页面载入时同时加载；@import需要在页面完全加载以后加载，而且@import被引用的CSS会等到引用它的CSS文件被加载完才加载
3. link是xhtml标签，无兼容问题；@import是在css2.1提出来的，低版本的浏览器不支持
4. link支持使用javascript控制去改变样式，而@import不支持
5. link方式的样式的权重高于@import的权重
6. import在html使用时候需要`<style type="text/css">`标签

</Answer>

##  CSS 盒模型以及 CSS 盒模型包含属性？

<Answer>

1. CSS 盒模型指的是盒子的属性，其中包括`content、padding、border、margin`，这些属性也是前端最常用的样式
2. 盒模型属性是 box-sizing ；其中主要的两个属性值是 `border-box`（IE盒模型） 和 `content-box`（W3C标准盒模型），主要影响的是`width`
3. `box-sizing: content-box;`（W3C标准盒模型）：这个是默认值，当设置`width`时，`width`包括`content`宽度
4. `box-sizing: border-box;`（IE盒模型）：设置`width`时，`width`包括`content、padding、border`宽度
5. 出现两种盒模型主要是因为当实际开发中我们设置 width 有时候只想要盒子整体的宽度，不需要考虑 padding 和 border的宽度

</Answer>

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

## 在不知道一个盒子的宽度的时候如何让它上下左右居中？

<Answer>

1. 父盒子设置 `display: flex; align-items: center; justify-content: center;` 
2. 父盒子设置 `display: grid; place-items: center;` 
3. 父盒子设置 `position: relative;` ，子盒子设置 `position: absolute; top: 50%; left: 50%; transform: translate(-50%);` 或者子元素设置 `position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;`
4. 父盒子设置 `line-height: height(高度和height高度一致);` ，子盒子设置 `margin: 0 auto;` 子元素若为行内元素，行内块元素，文本可以设置`text-align: center;`
5. 父盒子设置 `display: table-cell; vertical-align: middle;` ，子盒子设置 `margin: 0 auto;`
6. 多行文字水平垂直居中 `display: table-cell; vertical-align: middle; text-align: center;`, 子盒子设置 `display: inline;`

</Answer>

## 常见的伪元素和伪类选择器以及它们的区别？

<Answer>

1. 常见的伪元素选择器 
  - :after :before(应该是双冒号，但是书写时可以省略为单冒号) 通常用来清除浮动；以及在页面无内容的标志情况下使用，比如小竖线
  - ::selection ::first-letter ::first-line(这些都不常用) 
2. 常见的伪类选择器
   - :hover :active :visited :focus :nth-child(n) :not() :nth-of-type(n) ... 
3. 区别 伪元素 名字说明可以理解为它是一个假的元素节点，而伪类选择器是表示选中元素的一种状态

</Answer>

## 常见的css选择器以及它们的优先级？

<Answer>

优先级最高的是 !important 其次是行内样式接下来依次排行
1. ID选择器 (#my-id)
2. 类选择器 (.my-class-name)
3. 标签选择器 (div)
4. 相邻选择器 (h1 + p)
5. 子选择器 (ul > li)
6. 后代选择器 (li a)
7. 通配符选择器 (*)
8. 属性选择器 (a[attr="one"])
9. 伪类选择器 (a:hover) / 伪元素选择器 (a::before)
这些优先级都可以叠加，在大概两三百个标签选择器会覆盖类选择器，所以基本上我们通常认为有更高优先级的选择器那么他的优先级高，如果最高级选择器数量一样则会比较下一级；如果都相同下面的css样式会比上面的css样式优先级高
eg：
```css
div.box #children 
div.box .children 
div.box div 
div div
// 以上四个首先比较最高级选择器第一个为 ID 选择器 优先级最高；
// 第二个第三个最高级选择器为类选择器，在比较数量，第一个有两个类选择器所以优先级第二；
// 第三个优先级第三；
// 最后一个最高级选择器为标签选择器，优先级第四
```

</Answer>

## 实现两栏布局（一端固定另外一端自适应）或者三栏布局（两端固定，中间自适应），尝试多种方法？

<Answer>

1. 两栏布局
   - 浮动 左侧固定宽度且设置浮动，右侧设置 margin-left 的宽度为左侧宽度
   ```html
      <style>
        .box{
            overflow: hidden; // 添加BFC
        }
        .left {
            float: left;
            width: 200px;
            background-color: gray;
            height: 400px;
        }
        .right {
            margin-left: 200px;
            background-color: lightgray;
            height: 200px;
        }
    </style>
    <div class="box">
      <div class="left">左边</div>
      <div class="right">右边</div>
    </div>
   ```
   - flex弹性布局；父节点设置 flex，子节点一个设置固定宽度，另一个设置 `flex: 1`;(有时候会闻到`flex: 1`包含的属性以及主要设置了什么：设置了`flex-grow: 1`；flex 是三个属性合并的包含 flex-grow 初始值 0、 flex-shrink 初始值 1、 flex-basis 初始值 auto)
   ```html
    <style>
      .box{
          display: flex;
      }
      .left {
          width: 100px;
      }
      .right {
          flex: 1;
      }
    </style>  
    <div class="box">
        <div class="left">左边</div>
        <div class="right">右边</div>
    </div>
   ```
   - grid(网格) 布局
   - 定位布局
2. 三栏布局可以借鉴两栏一样的

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

## 你知道requestAnimationFrame函数嘛，日常开发中有什么作用？

<Answer>

1. 你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
2. 可以用来减少重绘和替代定时器以及保证动画的流畅性

</Answer>

## vue 中的`<style scope>`什么意思，怎么实现的？

<Answer>

1. 组件内的样式只在当前 vue 组件生效,实现组件的私有化，不对全局造成样式污染，表示当前 style 属性只属于当前模块;
   - 简单地说就是 该样式只作用于该组件
2. vue中的scoped属性的效果主要通过 PostCSS 转译实现，PostCSS 给一个组件中的所有 dom 添加了一个独一无二的动态属性，然后，给 CSS 选择器额外添加一个对应的属性选择器来选择该组件中 dom，这种做法使得样式只作用于含有该属性的 dom ——组件内部 dom
   - 简单说就是 对应的 dom 加了一个属性，data-v 加上生成的码，样式就可以通过属性选择对应的 dom 进行样式添加

</Answer>

## CSS 中 h5 的1像素问题是什么？有哪些解决方案？

<Answer>

1. 使用 transform 解决 `transform: translate(-50%, -50%) scale(0.5, 0.5);`

</Answer>

## em/px/rem/vh/vw 这些单位有什么区别？

<Answer>

1. 以上除了px都是相对单位，实际上px也是相对单位，但是我们通常认为他是绝对单位
2. rem是相对根节点 html 的 `font-size: 14px;`; 此时1em 等于 14px
3. em 相对父节点的 `font-size`
4. vh/vw 相对屏幕高度和宽度 1vh/1vw = 1%

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
