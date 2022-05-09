---
title: HTML
---

## DOCTYPE有什么作用？标准模式与混杂模式如何区分？它们有何意义?

<Answer>

告诉浏览器使用哪个版本的HTML规范来渲染文档。DOCTYPE不存在或形式不正确会导致HTML文档以混杂模式呈现。

标准模式（Standards mode）以浏览器支持的最高标准运行；混杂模式（Quirks mode）中页面是一种比较宽松的向后兼容的方式显示。

</Answer>

## HTML、XML、XHTML 的区别？

<Answer>

- HTML：超文本标记语言，是语法较为松散的、不严格的 Web 语言。
- XML：可扩展的标记语言，主要用于存储数据和结构，可扩展。
- XHTML：可扩展的超文本标记语言，基于 XML，作用与 HTML 类似，但语法更严格。

</Answer>

## 什么是 HTML5 它和 HTML 有什么区别？

<Answer>

HTML5是HTML的新标准，其主要目标是无需任何额外的插件如 Flash 等，就可以传输所有内容。它囊括了动画、视频、丰富的图形用户界面等。

HTML5是由万维网联盟（W3C）和Web Hypertext Application Technology Working Group 合作创建的HTML新版本。

</Answer>

## HTML5为什么只需要写 `<!DOCTYPE HTML>`？

<Answer>

HTML5不基于SGML（Standard Generalized Markup Language 标准通用标记语言），因此不需要对DTD（DTD 文档类型定义）进行引用，但是需要DOCTYPE来规范浏览器行为。

HTML4.01基于SGML，所以需要引用DTD。才能告知浏览器文档所使用的文档类型，如下：
`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

</Answer>

## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

<Answer>

- 行内元素：`a span img input select`
- 块级元素：`div ul ol li dl dt dd h1 p`
- 空元素：`<br> <hr> <link> <meta>`

</Answer>

## script 的 async 跟 defer 的区别，为什么建议放在 body 标签的底部？

<Answer>

起因：HTML在执行时，如果遇到外部JS引用，需要下载执行JS文件，此时会停止页面渲染，导致页面表现为空白。defer 和 async 用来控制JS文件的下载和执行。
`defer` 表明脚本执行时不会影响页面构造，让脚本在页面解析完成后执行（即让浏览器下载JS文件，但等到页面解析完成后执行）
`async` 只适用于外部JS文件，告诉浏览器立即下载JS文件，但是不保证按照JS的先后顺序运行（注意JS文件之间的依赖关系）

因为浏览器在渲染html的时候是从上到下执行的，当遇到js文件的时候就会停止当前页面的渲染，转而去下载js文件。
如果将script标签放在头部，在文件很大的情况下将导致首屏加载时间延长，影响用户体验。

</Answer>

## a 标签默认事件禁掉之后做了什么才实现了跳转?

<Answer>

`preventDefault()` 会导致阻止默认行为（即链接跳转），如果需要在阻止了默认行为后，依旧能够实现页面跳转，可以使用 `location.href`。

</Answer>

## html 中的 src 与 href 有什么区别？

<Answer>

src(Source) 是指向物件的来源地址，是引入，在 img、script、iframe 等元素上使用。

href(Hypertext Reference) 是超文本引用，指向需要连结的地方，是与该页面有关联的，是引用，在 link和 a 等元素上使用。

src 用于替代这个元素，而 href 用于建立这个标签与外部资源之间的关系。

</Answer>

## input上传文件可以同时选择多张吗？怎么设置？

<Answer>

capture 属性用于指定文件上传控件中媒体拍摄的方式。

可选值：
- user 前置
- environment 后置
- camera 相机
- camcorder 摄像机
- microphone 录音

```html
<input type='file' accept='image/*;' capture='camera'>
```

</Answer>

## input上传文件可以同时选择多张吗？怎么设置？

<Answer>

可以，通过给input标签设置multiple属性。

```html
<input type="file" name="files" multiple/>
```

</Answer>
