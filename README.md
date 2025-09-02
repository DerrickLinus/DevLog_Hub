# DevLog Hub

一个基于 Next.js + Tailwind 的个人技术博客示例，实现文章列表、详情、专栏、标签与时间线。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000` 访问。

## 内容编写

- 在 `content/posts` 中新增 Markdown 文件（`.md`）。
- 支持 Frontmatter 字段：
  - `Title`、`Date`、`Author`、`Tags`、`Column`、`Summary`
- 文件名即为文章 `slug`，如 `how-to-build-a-blog.md` → `/article/how-to-build-a-blog`

## 功能清单
- 响应式导航栏（桌面端/移动端）
- 首页文章列表（自动摘要、标签、专栏、阅读时长）
- 文章详情（Markdown 渲染、TOC、代码高亮）
- 专栏列表与专栏文章页
- 标签云与标签文章页
- 时间线（按年/月分组）

## 部署建议
- 推荐 Vercel/Netlify，连接仓库即可自动部署。
