---
title: 翻转链表
excerpt: leetcode刷题，翻转链表
image: head.jpg
date: '2022-8-20'
isFeatured: false
---

### 翻转链表

```js
var reverseList = function(head) {
    let pre = null
    let cur = head
    while(cur !== null){
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};
```

