---
title: 中等
---

## 什么是 SourceMap？

<Answer>

</Answer>

## 如何提高 webpack 的构建速度？

<Answer>

多入口情况下，使用CommonsChunkPlugin来提取公共代码
通过externals配置来提取常用库
利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
使用Happypack 实现多线程加速编译，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。（由于 js是单线程模型，要想发挥多核 CPU 的能力，只能通过多进程去实现，而无法通过多线程实现。）
使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度
使用Tree-shaking和Scope Hoisting来剔除多余代码

</Answer>

## 说说 webpack 中 Loader 和 Plugin 的区别？编写 Loader，Plugin 的思路？

<Answer>

</Answer>

## 如何利用 babel 自动导入 polyfills ？

<Answer>

</Answer>
