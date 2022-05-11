---
title: 中等
---

## 说说对 Node 中的 process 的理解？

<Answer>

</Answer>

## 请介绍一下 Node 里的模块是什么？

<Answer>

Node中，每个文件模块都是一个对象，所有的模块都是 Module 的实例。

</Answer>

## 新建 Buffer 会占用 V8 分配的内存吗？

<Answer>

不会，Buffer属于堆外内存，不是V8分配的。

</Answer>

## Buffer.alloc 和 Buffer.allocUnsafe 有什么区别？

<Answer>

Buffer.allocUnsafe创建的 Buffer 实例的底层内存是未初始化的。 新创建的 Buffer 的内容是未知的，可能包含敏感数据。 使用 Buffer.alloc() 可以创建以零初始化的 Buffer 实例。

</Answer>

## 请简述下 koa、egg 这两个 Node 框架的中间件原理

<Answer>

一般的中间件都会执行两次，调用next之前为第一次，调用next时把控制传递给下游的下一个中间件。当下游不再有中间件或者没有执行next函数时，就将依次恢复上游中间件的行为，让上游中间件执行next之后的代码

</Answer>

## 异步和非阻塞有什么区别？

<Answer>

异步意味着不同步。使用这些我们可以发出不等待服务器响应的异步 HTTP 请求。这些函数继续响应它已经收到服务器响应的请求。 非阻塞函数用于 I/O 操作。他们立即响应任何可用数据，并根据请求继续运行。如果无法检索到任何答案，则 API 会立即返回并显示错误。

</Answer>

## 谈谈你对 Stream 的理解？

<Answer>

流（Stream）是一种数据传输的手段，是一种端到端信息交换的方式，而且是有顺序的，是逐块读取数据、处理内容，用于顺序读取输入或写入输出。在Node中，Stream分成三部分：source、dest、pipe。

其中，在source和dest之间有一个连接的管道pipe，它的基本语法是source.pipe(dest)，source和dest就是通过pipe连接，让数据从source流向dest，如下图所示：
在Node，流可以分成四个种类：

可写流：可写入数据的流，例如 fs.createWriteStream() 可以使用流将数据写入文件。
可读流： 可读取数据的流，例如fs.createReadStream() 可以从文件读取内容。
双工流： 既可读又可写的流，例如 net.Socket。
转换流： 可以在数据写入和读取时修改或转换数据的流。例如，在文件压缩操作中，可以向文件写入压缩数据，并从文件中读取解压数据。

</Answer>

## process.nextTick 和 setImmediate 有什么区别？

<Answer>

传递给 setImmediate 函数的回调将在事件队列上的下一次迭代中执行。
另一方面，回调传递给 process.nextTick 在下一次迭代之前以及程序中当前运行的操作完成之后执行。在应用程序启动时，开始遍历事件队列之前调用它的回调。
因此，回调 process.nextTick 总是在 setImmediate 之前调用。

</Answer>
