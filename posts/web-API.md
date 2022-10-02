---
title: web-API
excerpt: web-API
image: head.jpg
date: "2022-9-20"
isFeatured: false
---

### BOM操作

+ BOM（浏览器对象模型）是浏览器本身的一些信息的设置和获取，例如获取浏览器的宽度、高度，设置让浏览器跳转到哪个地址。

+ navigator

  + 判断是否为谷歌浏览器

  ```js
  const ua = navigator.userAgent
  const isChrome = ua.indexOf('Chrome')
  ```

+ screen

  + 获取屏幕宽度高度

  ```js
  const screenWidth = screen.width
  const screenHeight = screen.height
  ```

+ location

  + 获取网址、协议、path、参数、hash等

  ```js
  const href = location.href //浏览器当前网址
  const protocol = location.protocol //浏览器当前网址协议
  const pathname = location.pathname //浏览器当前路径名
  const search = location.search //浏览器当前参数
  const hash = location.hash //浏览器当前哈希值
  ```

+ history

  + 控制浏览器前进后退等

  ```js
  history.back()
  history.forward()
  ```

### DOM操作

+ dom： 将 web 页面与到脚本或编程语言连接起来

+ 获取dom

  ```js
  document.getElementById('div') //元素
  document.getElementByTagName('div') //集合
  document.getElementByClassName('div') //集合
  document.querySelectorAll('div') //集合
  ```

+ 