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

## 如何实现两栏布局？

<Answer>

一般两栏布局指的是左边一栏宽度固定，右边一栏宽度自适应，两栏布局的具体实现：

利用浮动，将左边元素宽度设置为200px，并且设置向左浮动。将右边元素的margin-left设置为200px，宽度设置为auto（默认为auto，撑满整个父元素）。

.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  background: tomato;
}
.right {
  margin-left: 200px;
  width: auto;
  background: gold;
}
复制代码

利用浮动，左侧元素设置固定大小，并左浮动，右侧元素设置overflow: hidden; 这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠。

.left{
     width: 100px;
     height: 200px;
     background: red;
     float: left;
 }
 .right{
     height: 300px;
     background: blue;
     overflow: hidden;
 }
复制代码

利用flex布局，将左边元素设置为固定宽度200px，将右边的元素设置为flex:1。

.outer {
  display: flex;
  height: 100px;
}
.left {
  width: 200px;
  background: tomato;
}
.right {
  flex: 1;
  background: gold;
}
复制代码

利用绝对定位，将父级元素设置为相对定位。左边元素设置为absolute定位，并且宽度设置为200px。将右边元素的margin-left的值设置为200px。

.outer {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: tomato;
}
.right {
  margin-left: 200px;
  background: gold;
}
复制代码

利用绝对定位，将父级元素设置为相对定位。左边元素宽度设置为200px，右边元素设置为绝对定位，左边定位为200px，其余方向定位为0。

.outer {
  position: relative;
  height: 100px;
}
.left {
  width: 200px;
  background: tomato;
}
.right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 200px;
  background: gold;
}

</Answer>

## 如何实现三栏布局？

<Answer>

三栏布局一般指的是页面中一共有三栏，左右两栏宽度固定，中间自适应的布局，三栏布局的具体实现：

利用绝对定位，左右两栏设置为绝对定位，中间设置对应方向大小的margin的值。

.outer {
  position: relative;
  height: 100px;
}

.left {
  position: absolute;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
  background: lightgreen;
}
复制代码

利用flex布局，左右两栏设置固定大小，中间一栏设置为flex:1。

.outer {
  display: flex;
  height: 100px;
}

.left {
  width: 100px;
  background: tomato;
}

.right {
  width: 100px;
  background: gold;
}

.center {
  flex: 1;
  background: lightgreen;
}
复制代码

利用浮动，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的margin值，注意这种方式**，中间一栏必须放到最后：**

.outer {
  height: 100px;
}

.left {
  float: left;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: right;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  height: 100px;
  margin-left: 100px;
  margin-right: 200px;
  background: lightgreen;
}
复制代码

圣杯布局，利用浮动和负边距来实现。父级元素设置左右的 padding，三列均设置向左浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边。

.outer {
  height: 100px;
  padding-left: 100px;
  padding-right: 200px;
}

.left {
  position: relative;
  left: -100px;

  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: relative;
  left: 200px;

  float: right;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}
复制代码

双飞翼布局，双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的，而不是通过父元素的 padding 来实现的。本质上来说，也是通过浮动和外边距负值来实现的。

.outer {
  height: 100px;
}

.left {
  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: left;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.wrapper {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
}

</Answer>

## 如何实现水平垂直居中？

<Answer>

利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过translate来调整元素的中心点到页面的中心。该方法需要考虑浏览器兼容问题。

.parent {    position: relative;} .child {    position: absolute;    left: 50%;    top: 50%;    transform: translate(-50%,-50%);}
复制代码

利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。该方法适用于盒子有宽高的情况：

.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
复制代码

利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。该方法适用于盒子宽高已知的情况

.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;     /* 自身 height 的一半 */
    margin-left: -50px;    /* 自身 width 的一半 */
}
复制代码

使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对齐，然后它的子元素也可以实现垂直和水平的居中。该方法要考虑兼容的问题，该方法在移动端用的较多：

.parent {
    display: flex;
    justify-content:center;
    align-items:center;
}

</Answer>

## Flex布局的理解及其使用场景

<Answer>

Flex是FlexibleBox的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为Flex布局。行内元素也可以使用Flex布局。注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿水平主轴排列。
以下6个属性设置在容器上：

flex-direction属性决定主轴的方向（即项目的排列方向）。
flex-wrap属性定义，如果一条轴线排不下，如何换行。
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
justify-content属性定义了项目在主轴上的对齐方式。
align-items属性定义项目在交叉轴上如何对齐。
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

以下6个属性设置在项目上：

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

简单来说：
flex布局是CSS3新增的一种布局方式，可以通过将一个元素的display属性值设置为flex从而使它成为一个flex容器，它的所有子元素都会成为它的项目。一个容器默认有两条轴：一个是水平的主轴，一个是与主轴垂直的交叉轴。可以使用flex-direction来指定主轴的方向。可以使用justify-content来指定元素在主轴上的排列方式，使用align-items来指定元素在交叉轴上的排列方式。还可以使用flex-wrap来规定当一行排列不下时的换行方式。对于容器中的项目，可以使用order属性来指定项目的排列顺序，还可以使用flex-grow来指定当排列空间有剩余的时候，项目的放大比例，还可以使用flex-shrink来指定当排列空间不足时，项目的缩小比例。

</Answer>
