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
