---
Title: 如何构建一个现代化个人博客
Date: 2024-08-28
Author: Deng Linhui
Tags:
  - React
  - JavaScript
  - Next.js
Column: 前端工程化
Summary: 从零开始使用 Next.js、Tailwind 与 Markdown 管线构建个人技术博客
---

# 引言

一个高性能、易维护的个人博客可以显著提升创作效率与读者体验。本文将从项目初始化、内容组织到部署流程进行完整演示。

## 准备工作

- 安装 Node.js 18+
- 初始化 Next.js 应用
- 配置 Tailwind CSS

### 代码示例

```tsx
export default function Hello() {
  return <div className="text-sky-500">Hello Blog</div>
}
```

## 内容组织

- 使用 Markdown 存放在 `content/posts`。
- 使用 Frontmatter 管理标题、时间、标签、专栏等元信息。

## 部署建议

- 使用 Vercel 或 Netlify，一键连接 Git 仓库即可持续部署。
