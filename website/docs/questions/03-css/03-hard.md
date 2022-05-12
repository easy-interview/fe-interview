---
title: 困难
---

## 你知道requestAnimationFrame函数嘛，日常开发中有什么作用？

<Answer>

1. 你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
2. 可以用来减少重绘和替代定时器以及保证动画的流畅性

</Answer>

## 浏览器放大到 150% 是做了什么操作？

<Answer></Answer>

## CSS 中 h5 的 1 像素问题是什么？有哪些解决方案？

<Answer>

1. 使用 transform 解决 `transform: translate(-50%, -50%) scale(0.5, 0.5);`

1px 问题指的是：在一些 Retina屏幕 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单——CSS 中的 1px 并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：
window.devicePixelRatio = 设备的物理像素 / CSS像素。
复制代码
打开 Chrome 浏览器，启动移动端调试模式，在控制台去输出这个 devicePixelRatio 的值。这里选中 iPhone6/7/8 这系列的机型，输出的结果就是2：

这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。
解决1px 问题的三种思路：
思路一：直接写 0.5px
如果之前 1px 的样式这样写：
border:1px solid #333
复制代码
可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用 JSX 语法做示范）：
```
<div id="container" data-device={{window.devicePixelRatio}}></div>
```
复制代码
然后就可以在 CSS 中用属性选择器来命中 devicePixelRatio 为某一值的情况，比如说这里尝试命中 devicePixelRatio 为2的情况：
#container[data-device="2"] {
  border:0.5px solid #333
}
复制代码
直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要8及以上的版本，安卓系统则直接不兼容。

</Answer>

## 什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？

<Answer>

以 iPhone XS 为例，当写 CSS 代码时，针对于单位 px，其宽度为 414px & 896px，也就是说当赋予一个 DIV元素宽度为 414px，这个 DIV 就会填满手机的宽度；
而如果有一把尺子来实际测量这部手机的物理像素，实际为 1242*2688 物理像素；经过计算可知，1242/414=3，也就是说，在单边上，一个逻辑像素=3个物理像素，就说这个屏幕的像素密度为 3，也就是常说的 3 倍屏。
对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。

当然，也可以针对所有屏幕，都只提供最高清图片。虽然低密度屏幕用不到那么多图片像素，而且会因为下载多余的像素造成带宽浪费和下载延迟，但从结果上说能保证图片在所有屏幕上都不会失真。
还可以使用 CSS 媒体查询来判断不同的像素密度，从而选择不同的图片:

```css
my-image { background: (low.png); }
@media only screen and (min-device-pixel-ratio: 1.5) {
  #my-image { background: (high.png); }
}
```

</Answer>

## 如何设置小于 12px 的字体？

<Answer>

在谷歌下css设置字体大小为12px及以下时，显示都是一样大小，都是默认12px。
解决办法：

使用Webkit的内核的-webkit-text-size-adjust的私有CSS属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是chrome更新到27版本之后就不可以用了。所以高版本chrome谷歌浏览器已经不再支持-webkit-text-size-adjust样式，所以要使用时候慎用。
使用css3的transform缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用display：block/inline-block/...；
使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。

</Answer>

## css 如何优化性能？

<Answer>

1. 加载性能
   - 主要是从减少文件体积，减少阻塞加载，提高并发方面入手
   - css压缩、css单一样式`margin-left: 1px;`
   - 减少使用 @import, 而建议使用link, 因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载；
   - 合理设计CSS 布局，注意复用样式，减少渲染上花的时间
2. 选择器性能
   - 避免用通配符 *
   - 减少标签选择，用class
   - 不要去用标签限定ID或者类选择符，不要`div#id`最好写成`#id`
   - 少使用后代选择器，降低选择器权重值
   - 考虑继承（可以少写css代码）
3. 渲染性能
   - 慎重使用高性能属性：浮动、定位
   - 量减少页面重排、重绘
   - css雪碧图
   - 将css文件放在页面最上面
4. 可维护性、健壮性
   - 重复度高样式抽离
   - 样式与内容分离

</Answer>


## 浏览器是怎样解析CSS选择器的？

<Answer>

1. 浏览器从右往左（也称为自底向上）解析 CSS 选择器，这样的匹配节点的方式可以快速、准确的与 render 树上的节点进行匹配，避免了许多无效匹配

</Answer>

## css加载会造成阻塞吗？

<Answer>

1. css加载不会阻塞DOM树的解析
2. css加载会阻塞DOM树的渲染
3. css加载会阻塞后面js语句的执行

```text
解析过程：HTML解析文件，生成 DOM Tree，解析 CSS 文件生成 CSSOM Tree
将 Dom Tree 和 CSSOM Tree 结合，生成Render Tree (渲染树)
根据Render Tree渲染绘制，将像素渲染到屏幕上

解释：
DOM 解析和 CSS 解析是两个并行的进程，所以 CSS 加载不会阻塞 DOM 的解析
Render Tree 是依赖于 DOM Tree 和 CSSOM Tree 的，
必须 CSSOM Tree 构建完成，CSS 资源加载完成(或者失败)后，才能开始渲染。
CSS 加载是会阻塞 Dom 的渲染的。 js 可能会操作 Dom 节点和 css 样式，
因此浏览器会维持 html 中 css 和 js 的顺序。样式表会在后面的 js 执行前先加载执行完毕。
所以 css会阻塞后面 js 的执行。
```

</Answer>
