---
title: ReactNative
---

## ReactNative 有哪些优势和劣势？

<Answer>

</Answer>

## FlatList 和 ScrollView 有哪些区别?

<Answer>

FlatList和ScrollView其实最大的区别就是在渲染上的区别。ScrollView会一次性的把所有内容全部渲染出来，而FlatList会惰性渲染子元素，只在它们将要出现在屏幕中时开始渲染。他们都是基于VirtualizedList的一个封装。

</Answer>

## ReactNative 中不同线程是如何使用的？

<Answer>

React Native 现在使用 3 个线程：

MAIN/UI 线程— 这是运行你的 Android/iOS 应用程序的主应用程序线程。应用程序的 UI 可以由主线程更改并且它可以访问它。
 
Shadow Thread — 在 React Native 中使用 React 库创建的布局可以通过这个计算，它是一个后台线程。
 
JavaScript 线程——主要的 Javascript 代码由该线程执行。

</Answer>

## 为什么 ReactNative 白屏时间较长？

<Answer>

</Answer>

## 整个 React Native 代码如何处理以在移动屏幕上显示最终输出？

<Answer>

在应用程序第一次启动时，主线程开始执行并开始加载 JS 包。
当 JavaScript 代码加载成功后，主线程会将其发送到另一个 JS 线程，因为当 JS 进行一些繁重的计算时，该线程会占用一段时间，UI 线程不会一直受到影响。
当 React 开始渲染时，Reconciler 开始“diffing”，当它生成一个新的虚拟 DOM（布局）时，它会将更改发送到另一个线程（Shadow 线程）。
阴影线程计算布局，然后将布局参数/对象发送到主（UI）线程。（这里你可能想知道为什么我们称它为“阴影”？因为它会生成阴影节点）
由于只有主线程能够在屏幕上渲染某些内容，因此影子线程应该将生成的布局发送到主线程，然后才渲染 UI。

</Answer>

## 什么是Hermes 引擎，有哪些优点？

<Answer>

</Answer>

## 请说一说 ReactNative 架构

<Answer>

</Answer>

## ReactNative 热加载是如何实现的？

<Answer>

</Answer>
