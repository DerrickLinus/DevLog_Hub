import { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, getAllColumns } from '../lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devlog-hub.vercel.app'; // 替换为你的实际域名
  const posts = getAllPosts();
  const tags = Array.from(getAllTags().keys());
  const columns = Array.from(getAllColumns().keys());

  // 基础页面
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/columns`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // 文章页面
  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/article/${post.slug}`,
    lastModified: new Date(post.dateISO),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 专栏页面
  const columnRoutes: MetadataRoute.Sitemap = columns.map(column => ({
    url: `${baseUrl}/columns/${encodeURIComponent(column)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 标签页面
  const tagRoutes: MetadataRoute.Sitemap = tags.map(tag => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...routes, ...postRoutes, ...columnRoutes, ...tagRoutes];
}
