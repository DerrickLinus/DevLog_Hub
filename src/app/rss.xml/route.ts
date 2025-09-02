import { getAllPosts } from '../../lib/markdown';

export async function GET() {
  const posts = getAllPosts()
    .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
    .slice(0, 20); // 最新20篇文章

  const baseUrl = 'https://devlog-hub.vercel.app'; // 替换为你的实际域名
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DevLog Hub</title>
    <description>个人技术博客 - 记录学习笔记与技术思考</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    <webMaster>devlog@example.com (DevLog Hub)</webMaster>
    <managingEditor>devlog@example.com (DevLog Hub)</managingEditor>
    <ttl>60</ttl>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.frontmatter.Title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/article/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/article/${post.slug}</guid>
      <pubDate>${new Date(post.dateISO).toUTCString()}</pubDate>
      <author>devlog@example.com (${post.frontmatter.Author || 'DevLog Hub'})</author>
      ${post.frontmatter.Tags ? post.frontmatter.Tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ') : ''}
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}