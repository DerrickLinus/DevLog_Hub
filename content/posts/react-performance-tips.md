---
Title: React 性能优化实用技巧
Date: 2024-05-10
Author: Deng Linhui
Tags:
  - React
  - Performance
Column: 性能优化
Summary: React 性能优化的核心技术，包括组件优化、列表虚拟化和图片懒加载等实用方法
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
