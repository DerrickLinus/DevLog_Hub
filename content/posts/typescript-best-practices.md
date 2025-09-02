---
Title: TypeScript 最佳实践指南
Date: 2023-12-01
Author: Deng Linhui
Tags:
  - TypeScript
  - Engineering
Column: 前端工程化
Summary: 通过类型系统提升可维护性与团队协作效率的实践总结
---

# 核心理念

- 明确的公共 API 类型定义。
- 避免 `any` 与不安全断言。
- 使用 `unknown` 作为更安全的顶级类型。

## 示例

```ts
export function parseJson<T>(text: string): T | null {
  try { return JSON.parse(text) as T } catch { return null }
}
```
