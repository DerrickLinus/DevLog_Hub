import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import readingTime from 'reading-time';
import dayjs from 'dayjs';

export type PostFrontmatter = {
	Title: string;
	Date: string;
	Author?: string;
	Tags?: string[];
	Column?: string;
	Summary?: string;
};

export type PostItem = {
	slug: string;
	frontmatter: PostFrontmatter;
	content: string;
	excerpt: string;
	readingMinutes: number;
	dateISO: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

export function getAllPostSlugs(): string[] {
	if (!fs.existsSync(CONTENT_DIR)) return [];
	return fs
		.readdirSync(CONTENT_DIR)
		.filter((f) => f.endsWith('.md'))
		.map((f) => f.replace(/\.md$/, ''));
}

export function readPostBySlug(slug: string): PostItem | null {
	const filePath = path.join(CONTENT_DIR, `${slug}.md`);
	if (!fs.existsSync(filePath)) return null;
	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content, excerpt } = matter(raw, { excerpt: true, excerpt_separator: '\n\n' });
	const fm = data as PostFrontmatter;
	const stats = readingTime(content);
	const dateISO = dayjs(fm.Date).toISOString();
	return {
		slug,
		frontmatter: fm,
		content,
		excerpt: fm.Summary || excerpt || content.slice(0, 180),
		readingMinutes: Math.max(1, Math.round(stats.minutes)),
		dateISO,
	};
}

export function getAllPosts(): PostItem[] {
	return getAllPostSlugs()
		.map((slug) => readPostBySlug(slug))
		.filter(Boolean) as PostItem[];
}

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
	const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkFrontmatter, ['yaml'])
		.use(remarkToc, { heading: '目录|toc', tight: true, maxDepth: 3 })
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
		.use(rehypeHighlight)
		.use(rehypeStringify)
		.process(markdown);
	return String(file);
}

export function getAllTags(): Map<string, number> {
	const map = new Map<string, number>();
	for (const post of getAllPosts()) {
		for (const tag of post.frontmatter.Tags || []) {
			map.set(tag, (map.get(tag) || 0) + 1);
		}
	}
	return map;
}

export function getAllColumns(): Map<string, { count: number; description?: string }>{
	const map = new Map<string, { count: number; description?: string }>();
	for (const post of getAllPosts()) {
		const c = post.frontmatter.Column;
		if (!c) continue;
		map.set(c, { count: (map.get(c)?.count || 0) + 1, description: undefined });
	}
	return map;
}

export function groupPostsByYearMonth(): Record<string, Record<string, PostItem[]>> {
	const result: Record<string, Record<string, PostItem[]>> = {};
	for (const p of getAllPosts()) {
		const d = dayjs(p.frontmatter.Date);
		const year = d.format('YYYY');
		const month = d.format('MM');
		result[year] = result[year] || {};
		result[year][month] = result[year][month] || [];
		result[year][month].push(p);
	}
	for (const y of Object.keys(result)) {
		for (const m of Object.keys(result[y])) {
			result[y][m].sort((a, b) => (dayjs(b.frontmatter.Date).unix() - dayjs(a.frontmatter.Date).unix()));
		}
	}
	return result;
}
