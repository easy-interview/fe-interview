---
title: 困难
---

## webpack 打包流程是什么样的？

<Answer>

1. 生成options (将webpack.config.js和shell中的参数，合并中options对象)
2. 实例化complier对象 （webpack全局的配置对象，包含entry，output，loader，plugins等所有配置信息）
3. 实例化Compilation对象 (compiler.run方法执行，开始编译过程，生成Compilation对象)
4. 分析入口js文件，调用AST引擎(acorn)处理入口文件，生成抽象语法树AST，根据AST构建模块的所有依赖
5. 通过loader处理入口文件的所有依赖，转换为js模块，生成AST，继续遍历，构建依赖的依赖，递归，直至所有依赖分析完毕
6. 对生成的所有module进行处理，调用plugins，合并，拆分，生成chunk
7. 将chunk生成为对应bundle文件，输出到目录

</Answer>

## 说说 webpack 的热更新是如何做到的？原理是什么？

<Answer>

基本原理：webpack监听文件变化，服务端和客户端有websocket通信，服务端向客户端发送文件变化消息，客户端根据文件变化消息获取变更模块代码，进行模块代码的热替换

1. 配置开启热更新，设置entry格式和webpack-dev-server的option，使得打包的bundle里面包含HMR runtime和websocket连接的代码
2. webpack-dev-server通过express启动服务端
3. 客户端通过sockjs和服务端建立websocket长连接
4. webpack监听文件变化，文件保存触发webpack重新编译，编译后的代码保存在内存中，不在output.path中产生输出
5. 编译会生成hash值，hot-update.json(已改动模块的json)，hot-update.js(已改动模块的js)
6. 通过socket向客户端发送hash值
7. 客户端对比hash值，一致在走缓存，不一致则通过ajax获取hot-update.json，json包含模块hash值，再通过jsonp请求获取hot-update.js
8. 热更新js模块，若失败，则live reload刷新浏览器代替热更新（若模块未配置热更新，则同样live reload）

Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。
HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。
后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

</Answer>

## rollup 是如何实现的？

<Answer>

</Answer>

## ESBuild 是如何实现的？

<Answer>

</Answer>

## Vite 是如何实现的？

<Answer>

</Answer>

## Vite 是如何实现的热加载的？

<Answer>

</Answer>

## 说一说 Babel 的原理

<Answer>

大多数JavaScript Parser遵循 estree 规范，Babel 最初基于 acorn 项目(轻量级现代 JavaScript 解析器)
Babel大概分为三大部分：

解析：将代码转换成 AST

词法分析：将代码(字符串)分割为token流，即语法单元成的数组语法分析：分析token流(上面生成的数组)并生成 AST
转换：访问 AST 的节点进行变换操作生产新的 AST

生成：以新的 AST 为基础生成代码

</Answer>
