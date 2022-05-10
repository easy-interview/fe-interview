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


</Answer>

## flex布局常用的属性？

<Answer>


</Answer>