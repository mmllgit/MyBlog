---
title: react虚拟链表
excerpt: react虚拟链表
image: head.jpg
date: "2022-9-8"
isFeatured: true
---

```js
import React, { useState, useRef, useEffect } from "react";
import "./VirtualList.css";

export default function VirtualList() {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([0, 0]);
  const scroll = useRef(null);
  const box = useRef(null);
  const content = useRef(null);
  const scrollInfo = useRef({
    height: 500,
    bufferCount: 8,
    itemHeight: 100,
    renderCount: 0,
  });

  useEffect(() => {
    const height = box.current.offsetHeight;
    console.log(height)
    const { itemHeight, bufferCount } = scrollInfo.current;
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
    const dataList = new Array(10000).fill(0).map((item, index) => index + 1);
    setData(dataList);
    setPosition([0, renderCount]);
  }, []);

  const handleScroll = () => {
    const { scrollTop } = scroll.current;
    const { itemHeight, renderCount } = scrollInfo.current;
    const currentOffset = scrollTop - (scrollTop % itemHeight);
    const start = Math.floor(scrollTop / itemHeight);
    content.current.style.transform = `translateY(${currentOffset}px)`;
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    console.log(start, end);
    if (end !== position[1] || start !== position[0]) {
      setPosition([start, end]);
    }
  };

  const [start, end] = position;
  const renderList = data.slice(start, end);
  const { height, itemHeight } = scrollInfo.current;

  return (
    <div ref={box} className="virtual-list">
      <div ref={scroll} onScroll={handleScroll} className="scroll-box">
        <div ref={content} style={{ height: height + "px" }}>
          {renderList.map((item, index) => {
            return (
              <div className="item" key={index}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

```

