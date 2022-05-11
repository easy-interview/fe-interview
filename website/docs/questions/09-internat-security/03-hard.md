---
title: 困难
---

## 请描述下整个 HTTPS 请求过程，它使用了哪些加密算法，又是如何防止中间人攻击的？

<Answer>

</Answer>

## IPv4 和 IPv6 有什么区别？为什么要 ipv6？

<Answer>

</Answer>

## DNS 的路径选择用了什么算法？

<Answer>

</Answer>

## 什么是 SYN 攻击？

<Answer>

</Answer>

## TCP 为什么三次握手四次挥手？TCP四次挥手为什么要有TIME_WAIT状态？

<Answer>

</Answer>

## TCP 是如何进行拥塞控制的？

<Answer>

</Answer>

## 什么是 TCP 滑动窗口？

<Answer>

</Answer>

## 如何处理 TCP 发包和收包的 “粘包” 问题？

<Answer>

</Answer>

## 请问TCP是如何实现可靠传输的?

<Answer>

</Answer>

## 请介绍下 HTTP keep-alive 和 TCP keep-alive

<Answer>

</Answer>

## 你知道子网掩码这个概念吗？这个出错了会怎么办？是访问不了内网还是外网还是怎么？如何区分 ABC 类地址？

<Answer>

</Answer>

## 如何设计并实现 JWT 鉴权?

<Answer>

JWT（JSON Web Token），本质就是一个字符串书写规范，作用是用来在用户和服务器之间传递安全可靠的

在目前前后端分离的开发过程中，使用token鉴权机制用于身份验证是最常见的方案，流程如下：

服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌，这个令牌作为后续用户访问一些接口的凭证。
后续访问会根据这个令牌判断用户时候有权限进行访问。

Token，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以.进行拼接。其中头部和载荷都是以JSON格式存放数据，只是进行了编码，

</Answer>
