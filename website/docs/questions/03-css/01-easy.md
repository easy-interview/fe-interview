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
