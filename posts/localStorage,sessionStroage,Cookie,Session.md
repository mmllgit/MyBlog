---
title: localStorage,sessionStroage,Cookie,Session
excerpt: localStorage,sessionStroage,Cookie,Session
image: head.jpg
date: "2022-9-5"
isFeatured: true
---

### localStorage和sessionStorage

#### 共同点

1. 存储大小均为5M左右
2. 都受同源策略限制
3. 仅在客户端中保存，不参与和服务器的通信

#### 不同点

1. 生命周期
   + localStorage：存储的数据是永久性的，除非用户人为删除否则会一直存在
   + sessionStorage：与存储数据的脚本所在的标签页的有效期是相同的。一旦窗口或者标签页被关闭，那么所有通过seesionStorage存储的数据也会被删除。
2. 作用域
   + localStorage：在同一个浏览器内，同源文档之间共享localStorage数据，可以互相读取、覆盖
   + sessionStorage：不仅需要同源文档这一条件，sessionStorage的作用域还被限定在了窗口中，只有同一浏览器，同一窗口的同源文档才能共享数据

### Cookie

#### 基本概念

Cookie是小甜饼的意思，主要特点有：

1. 大小限制为4KB左右
2. 主要用途是保存登录信息和标记用户等
3. 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效
4. 每次都会携带在http头中，如果使用Cookie保存过多数据会带来性能问题
5. 原生API不如storage友好，需要自己封装

#### 用法

服务端向客户端发送的cookie（http头，不带参数）：

```js
Set-Cookie:<cookie-name>=<cookie-value>(name可选)
```

服务器向客户端发送的cookie（http头，带参数）：

```js
Set-Cookie:<cookie-name>=<cookie-value>(可选参数1)(可选参数2)
```

客户端设置cookie：

```js
document.cookie = "<cookie-name>=<cookie-value>(可选参数1);(可选参数2)"
```

可选参数：
Expires=<date>：cookie的最长有效时间，若不设置则cookie生命期与会话期相同

Max-Age=<non-zero-digit>：cookie生成后失效的秒数

Domain=<domain-value>：指定cookie可以送达的主机域名，若一级域名设置了则二级域名也能获取。

Path=<path-value>：指定一个URL，例如指定path=/docs，则”/docs”、”/docs/Web/“、”/docs/Web/Http”均满足匹配条件

Secure：必须在请求使用SSL或HTTPS协议的时候cookie才回被发送到服务器

HttpOnly：客户端无法更改Cookie，客户端设置cookie时不能使用这个参数，一般是服务器端使用

示例：

```js
Set-Cookie: sessionid=aes7a8; HttpOnly; Path=/

document.cookie = "KMKNKK=1234;Sercure"
复制代码
```

可选前缀：
__Secure-：以`_Secure-为前缀的cookie，必须与secure属性一同设置，同时必须应用于安全页面（即使用HTTPS）

Host-：以Host-为前缀的cookie，必须与secure属性一同设置，同时必须应用于安全页面（即使用HTTPS）。必须不能设置domian属性（这样可以防止二级域名获取一级域名的cookie），path属性的值必须为”/“。

前缀使用示例：

```js
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
Set-Cookie: __Host-ID=123; Secure; Path=/

document.cookie = "__Secure-KMKNKK=1234;Sercure"
document.cookie = "__Host-KMKNKK=1234;Sercure;path=/"
```

### session

#### 基本概念

Session是在无状态的HTTP协议下，服务端记录用户状态时用于标识具体用户的机制。它是在服务端保存的用来跟踪用户的状态的数据结构，可以保存在文件、数据库或者集群中。

在浏览器关闭后这次的Session就消失了，下次打开就不再拥有这个Session。其实并不是Session消失了，而是Session ID变了，服务器端可能还是存着你上次的Session ID及其Session 信息，只是他们是无主状态，也许一段时间后会被删除。

大多数的应用都是用Cookie来实现Session跟踪的，第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在Cookie里面记录一个SessionID，以后每次请求把这个会话ID发送到服务器

#### 与Cookie的关系与区别：

1、Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中，Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现Session的一种方式。

2、Cookie的安全性一般，他人可通过分析存放在本地的Cookie并进行Cookie欺骗。在安全性第一的前提下，选择`Session`更优。重要交互信息比如权限等就要放在Session中，一般的信息记录放Cookie就好了。 

3、单个Cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个Cookie。 

4、当访问增多时，Session会较大地占用服务器的性能。考虑到减轻服务器性能方面，应当适时使用Cookie。 

5、Session的运行依赖Session ID，而Session ID是存在 Cookie 中的。也就是说，如果浏览器禁用了Cookie,Session也会失效（但是可以通过其它方式实现，比如在`url`中传递Session ID,即sid=xxxx）。

### 面试题

#### localStorage，sessionStorage， cookie的区别

+ localStorage: localStorage 的生命周期是永久的，关闭页面或浏览器之后 localStorage 中的数据也不会消失。localStorage 除非主动删除数据，否则数据永远不会消失

+ sessionStorage: sessionStorage 的生命周期是仅在当前会话下有效。sessionStorage 引入了一个“浏览器窗口”的概念，sessionStorage 是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是 sessionStorage 在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage 也是不一样的

+ cookie: cookie生命期为只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。 存放数据大小为4K左右, 有个数限制（各浏览器不同），一般不能超过20个。缺点是不能储存大数据且不易读取

|     特性     |                          Cookie                          |           localStorage           |          sessionStorage          |
| :----------: | :------------------------------------------------------: | :------------------------------: | :------------------------------: |
|   生命周期   | 服务器生成，按设置时间有效，浏览器生成，关闭浏览器前有效 |      永久保存，除非手动清除      |      关闭浏览器或窗口后失效      |
| 存放数据大小 |                           4KB                            |              一般5M              |              一般5M              |
| 与服务端通信 |     携带在HTTP头中，cookie保存过多数据会带来性能问题     | 仅在客户端保存，不参与服务端通信 | 仅在客户端保存，不参与服务端通信 |
|     用途     |             用于表示用户身份，保存登录状态等             |        用于浏览器缓存数据        |        用于浏览器缓存数据        |

