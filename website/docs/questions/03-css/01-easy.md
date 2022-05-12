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

## CSS 中 h5 的1像素问题是什么？有哪些解决方案？

<Answer>

1. 使用 transform 解决 `transform: translate(-50%, -50%) scale(0.5, 0.5);`

</Answer>

## 如何用纯CSS创建一个三角形？

<Answer>

1. 将宽高设置为0 ，三个 border 设置透明，一个 border 设置颜色
```css
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 40px solid #ff0000;
```

</Answer>

## 为什么要初始化CSS样式？

<Answer>

1. 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异

</Answer>

## `display:none;`、`opacity: 0;`与`visibility：hidden;`的区别？

<Answer>

1. `display：none;` 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）
2. `visibility：hidden;` 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）
3. `opacity: 0;` 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

</Answer>

## 相邻元素节点之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

<Answer>

1. 引起原因主要是代码中间空格会算字体大小原因
2. 解决办法
   - 把字符大小设为0
   - margin 设置负数
   - 设置`float: left`
   - 相邻元素代码代码全部写在一排
  ```html
    <span></span>
    <span></span>
    // 改进
    <span></span><span></span>
  ```

</Answer>