---
title: react Hooks
excerpt: react Hooks
image: head.jpg
date: "2022-9-13"
isFeatured: false 
---

### 为什么会有hooks？

1. 没有hooks，函数组件只能接受props，渲染UI以及触发父组件穿过来的事件.
2. 没有hooks，我们只能使用类组件保存状态，类组件会随着功能增强而越来越臃肿，代码维护成本高，不利于tree shaking.

#### 原因

1. 让函数组件也能做类组件的事，有自己的状态，可以处理一些副作用获取ref，也能做数据缓存
2. 解决逻辑复用难的问题
3. 放弃面向对象变成，拥抱函数式编程

### Hooks与fiber

+ hooks 可以作为函数组件本身和函数组件对应的 fiber 之间的沟通桥梁。
+ hooks存在三种处理策略：
  1. contextOnlyDispatcher：保证hook只在函数组件中调用
  2. HooksDispatcherOnmount：在组件挂载时建立起函数组件和fiber的桥梁
  3. HooksDispatcherOnupdate：在更新时获取和维护状态

### 组件是如何保存state信息的

+ 对于类组件 fiber ，用 memoizedState 保存 state 信息

+ 对于函数组件 fiber ，用 memoizedState 保存 hooks 信息。

### React 如何判断hooks在函数内部调用

+ 引用的 React hooks都是从 ReactCurrentDispatcher.current 中的， React 就是通过赋予 current 不同的 hooks 对象达到监控 hooks 是否在函数组件内部调用

### hooks初始化- hooks 如何和 fiber 建立起关系

+ 首先函数组件对应 fiber 用 memoizedState 保存 hooks 信息，每一个 hooks 执行都会产生一个 hooks 对象，hooks 对象中，保存着当前 hooks 的信息，不同 hooks 保存的形式不同。每一个 hooks 通过 next 链表建立起关系。

### hooks更新

+ 更新 hooks 逻辑和 fiber的双缓冲树更新差不多，会首先取出 workInProgres.alternate 里面对应的 hook ，然后根据之前的 hooks 复制一份，形成新的 hooks 链表关系。

### hooks 规则，hooks 为什么要通常放在顶部，hooks 不能写在 if 条件语句中

+ 因为在更新过程中，如果通过 if 条件语句，增加或者删除 hooks，在复用 hooks 过程中，会产生复用 hooks 状态和当前 hooks 不一致的问题。

### 每一次改变 state ，底层会做这些事

+ 首先用户每一次调用 dispatchAction（比如如上触发 setNumber ）都会先创建一个 update ，然后把它放入待更新 pending 队列中。
+ 然后判断如果当前的 fiber 正在更新，那么也就不需要再更新了。
+ 反之，说明当前 fiber 没有更新任务，那么会拿出上一次 state 和 这一次 state 进行对比，如果相同，那么直接退出更新。如果不相同，那么发起更新调度任务。这就解释了，为什么函数组件 useState 改变相同的值，组件不更新了。

### useEffect初始化

- mountWorkInProgressHook 产生一个 hooks ，并和 fiber 建立起关系。
- 通过 pushEffect 创建一个 effect，并保存到当前 hooks 的 memoizedState 属性下。
- pushEffect 除了创建一个 effect ， 还有一个重要作用，就是如果存在多个 effect 或者 layoutEffect 会形成一个副作用链表，绑定在函数组件 fiber 的 updateQueue 上。

### 更新 effect 的过程非常简单。

- 就是判断 deps 项有没有发生变化，如果没有发生变化，更新副作用链表就可以了；如果发生变化，更新链表同时，打执行副作用的标签：fiber => fiberEffectTag，hook => HookHasEffect。在 commit 阶段就会根据这些标签，重新执行副作用。

### 不同的effect

关于 EffectTag 的思考：

- React 会用不同的 EffectTag 来标记不同的 effect，对于useEffect 会标记 UpdateEffect | PassiveEffect， UpdateEffect 是证明此次更新需要更新 effect ，HookPassive 是 useEffect 的标识符，对于 useLayoutEffect 第一次更新会打上 HookLayout 的标识符。React 就是在 commit 阶段，通过标识符，证明是 useEffect 还是 useLayoutEffect ，接下来 React 会同步处理 useLayoutEffect ，异步处理 useEffect 。
- 如果函数组件需要更新副作用，会标记 UpdateEffect，至于哪个effect 需要更新，那就看 hooks 上有没有 HookHasEffect 标记，所以初始化或者 deps 不想等，就会给当前 hooks 标记上 HookHasEffect ，所以会执行组件的副作用钩子。