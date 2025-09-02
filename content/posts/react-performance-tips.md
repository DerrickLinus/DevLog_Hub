---
Title: React 性能优化实用技巧
Date: 2024-05-10
Author: 张三
Tags:
  - React
  - Performance
Column: 性能优化
Summary: 掌握关键的性能优化策略，打造流畅的 React 应用。
---

# 概览

提升 React 应用性能通常可以从以下几个方向入手：

## 组件与渲染

- 使用 `React.memo` 避免不必要的重渲染。
- 使用 `useMemo` 与 `useCallback` 缓存计算与回调。

```jsx
const List = React.memo(({ items }) => {
  return items.map(i => <div key={i.id}>{i.name}</div>);
});
```

## 列表与图片

- 列表虚拟化（如 react-window）。
- 图片懒加载与合适的尺寸裁剪。
