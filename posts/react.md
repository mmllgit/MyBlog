---
title: react技术揭秘
excerpt: react技术揭秘
image: head.jpg
date: "2022-9-10"
isFeatured: true
---

### React 理念

1. 官网：我们认为，React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。
2. 原因总结：
   + CPU的瓶颈：项目庞大，组件复杂时，js执行时间过长，造成页面调帧，造成卡顿
     + 解决方式：react预留一些时间给js线程，在预留时间中执行，不够则将控制权 交还给浏览器，等待下一帧到来继续执行js
     + 这种方式被称为时间切片，将同步的更新变为可中断的异步更新
   + IO的瓶颈
     + 网络延迟带来的问题，React实现了Suspense功能及配套的hook——useDeferredValue
     + 将同步更新转化为异步更新
3. 总结：react为了践行构建快速响应的大型web应用程序理念的关键是解决cpu瓶颈和io瓶颈，实现上采用了将同步的更新变为异步课终断的更新

### 老的react架构

- Reconciler（协调器）—— 负责找出变化的组件
  - 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
  - 将虚拟DOM和上次更新时的虚拟DOM对比
  - 通过对比找出本次更新中变化的虚拟DOM
  - 通知Renderer将变化的虚拟DOM渲染到页面上
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上
  - 在浏览器渲染下使用的时ReactDOM
- 缺点：
  - 在**Reconciler**中，mount的组件会调用mountComponent，`update`的组件会调用updateComponent 。这两个方法都会递归更新子组件。
  - 由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。
  - 老版本的react还未是异步更新，所以中断更新会看不到想要的效果

### 新的react架构

+ Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
  + 为了实现浏览器在空闲时间执行回调，实现了scheduler调度器
+ Reconciler（协调器）—— 负责找出变化的组件
  + 整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。
+ Renderer（渲染器）—— 负责将变化的组件渲染到页面上
  + **Renderer**根据**Reconciler**为虚拟DOM打的标记，同步执行对应的DOM操作。

### Fiber架构的心智模型

+ 代数效应：能够将副作用从函数逻辑中分离，使函数关注点保持纯粹
+ 在react中的应用就是hooks，例如当使用useState时，我们不关心状态如何保存，我们只需要拿到我们的state处理业务就行了

### Fiber架构的实现原理

+ 虚拟dom在react中的正式称呼为fiber

+ Fiber包含三层含义：

  1. 作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler

     ```js
     // 指向父级Fiber节点
     this.return = null;
     // 指向子Fiber节点
     this.child = null;
     // 指向右边第一个兄弟Fiber节点
     this.sibling = null;
     ```

     

  2. 作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

     ```js
     // Fiber对应组件的类型 Function/Class/Host...
     this.tag = tag;
     // key属性
     this.key = key;
     // 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
     this.elementType = null;
     // 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
     this.type = null;
     // Fiber对应的真实DOM节点
     this.stateNode = null;
     ```

  3. 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

     ```js
     // 保存本次更新造成的状态改变相关信息
     this.pendingProps = pendingProps;
     this.memoizedProps = null;
     this.updateQueue = null;
     this.memoizedState = null;
     this.dependencies = null;
     
     this.mode = mode;
     
     // 保存本次更新会造成的DOM操作
     this.effectTag = NoEffect;
     this.nextEffect = null;
     
     this.firstEffect = null;
     this.lastEffect = null;
     ```

  ### Fiber架构的工作原理

  + 双缓存：在内存中构建并直接替换的技术叫做双缓存

  + 双缓存树

    + 在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树

    + current Fiber树中的Fiber节点被称为current fiber，workInProgress Fiber树中的Fiber节点被称为workInProgress fiber，他们通过alternate属性连接。

      ```js
      currentFiber.alternate === workInProgressFiber;
      workInProgressFiber.alternate === currentFiber;
      ```

      