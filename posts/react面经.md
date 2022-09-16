---
title: 字节面经
excerpt: 字节面经
image: head.jpg
date: "2022-9-12"
isFeatured: false
---

### React18更新的地方

1. 新增了useId，startTransition，useTransition，useDeferredValue，useSyncExternalStore，useInsertionEffect等新的 hook API

2. 针对浏览器和服务端渲染的 React DOM API 都有新的变化，诸如:

   + React DOM Client 新增 createRoot 和 hydrateRoot 方法。

   + React DOM Server 新增 renderToPipeableStream 和 renderToReadableStream 方法。

3. 部分弃用特性。

   + ReactDOM.render 已被弃用。使用它会警告：在 React 17 模式下运行您的应用程序。 -

   + ReactDOM.hydrate已被弃用。使用它会警告：在React 17 模式下运行您的应用程序。

   + ReactDOM.unmountComponentAtNode已被弃用。 ReactDOM.renderSubtreeIntoContainer 已被弃用。

   + ReactDOMServer.renderToNodeStream 已被弃用。

4. breaking change

   + 自动批处理

   + Stricter Strict Mode

   + 一致的 useEffect 计时

   + 更严格的补水错误

   + 带有悬念的布局效果

   + 新的 JS 环境要求

### 副作用是什么，什么不是副作用

+ 纯函数：给一个函数相同的参数，永远返回相同的值，并且没有副作用

+ 副作用就是函数做了与本身运算返回值无关的事情
+  

### useEffect参数

+ 第一个参数为函数，是在组件挂载时会调用一次，返回值也是一个函数，会在组件卸载时调用，也会在第二个参数的依赖改变时调用
+ 第二个参数为第一个函数的依赖，是一个数组，为空数组时第一个参数函数只会在挂载时调用，不为空数组时函数会在依赖改变时调用

### react类组件和函数式组件的区别

+ 函数式组件是一个纯函数，他接受props去返回reac元素。而类组件为一个类，需要去继承React.component，需要创建render函数去返回react元素

+ 函数组件没有生命周期，依靠useEffect来模拟生命周期，类组件有生命周期，会在合适的事件去调用生命周期函数
+ 函数组件没有自己的状态，依靠useState来存储自生的状态
+ 函数组件通过调用该函数，返回自己的虚拟dom，渲染到页面上，类组件通过new出类的实例，通过原型上的render方法返回虚拟dom，渲染页面
+ 函数组件中没有this，而类组件中的this指向当前组件的实例对象

### 组件什么时候更新

+ 组件自身状态或者props改变时会引起更新
+ 父组件更新会引起子组件的更新
+ context value改变时，使用该值的组件会更新

### 子组件什么时候不会重新渲染

+ 满足以下两个条件
  1. 子组件自身被缓存
  2. 子组件所有的props都被缓存

### React如何定义props改变了

+ 每次更新时，react会使用久fiber的props和新fiber的props比较，而新fiber的props被赋为jsx的props，而react组件仅使用！==号来判断props是否相等，由于不同对象比较内存地址值，即使props值未变，但是比较任为false，所以子组件也更新了

### 父组件更新子组件更新吗？为什么

+ 会更新子组件，每次更新时，react会使用久fiber的props和新fiber的props比较，而新fiber的props被赋为jsx的props，而react组件仅使用！==号来判断props是否相等，由于不同对象比较内存地址值，即使props值未变，但是比较任为false，所以子组件也更新了

### 优化子组件不渲染

1. 将子组件使用React.memo或者useMemo包裹，使每次更新时子组件都为同一个jsx对象
2. 将子组件的prop都缓存下来

### react浅比较规则

1. 先判断两者是否为同一对象，是则直接返回true
2. 接着判断两者的值是否不为对象或者null，如果是，则返回false
3. 接着判断两者的props长度，不等直接返回false
4. 判断两者的key值是否相同，如果不同直接返回false

###  useCallback写一下用法

```js
const testCallback = React.useCallback(()=>{console.log('test')}, [])
```

### memo

+ React.memo用来优化组件，防止重复渲染行为，针对组件，返回组件
+ useMemo缓存一个值，可用来避免重复的计算，减少资源浪费
+ useCallbakc缓存一个函数，返回一个函数，useMemo参与渲染，所以会在渲染期间完成，useEffect会在渲染之后执行

### react router功能

+ 单页面应用是在使用一个html文件的基础上，加载资源，所有页面都在一个容器页面下，页面之间的切换实际是组件的切换
+ 给用户带来更好的体验，是用户在web页面上也有像app一样的体验
+ 通过监听页面url的变化，使页面在无刷新的情况切换，且无需重复加载资源

### 不用router能写页面吗

+ router其实就是想给web页面一个像app一样的友好体验，在没有router的情况下也是可以编写页面的。

+ 可以，所谓router也只是控制组件的展示和隐藏，在没有router的情况下我们可以通过使用逻辑进行组件的隐藏和展示
+ 如果是要改变url的，可以由后端来改变，前端请求url，以此来切换页面

### 单页面应用，多页面

+ 单页面应用就是一个html页面，加载资源，然后将所有页面都放在一个容器页面下，页面之间的切换其实就是组件之间的切换。
+ 多页面应用就是多个独立的页面的应用，每个页面必须重复加载js，css文件等资源，多页面应用需要整页资源刷新

### 浏览如何实现切换页面，但没有刷新

+ 路由的功能就是实现切换页面，但不刷新页面

### ts用过吗，联合类型，泛型，手写一下

```ts
let test:string | undefined  //联合类型
function createArray<T>(length:number, value: T):Array<T>{
    let result:T[] = []
    for(let i = 0; i < length; i ++){
        result[i] = value
    }
    return result
}
```