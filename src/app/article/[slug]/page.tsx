import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPostSlugs, readPostBySlug, renderMarkdownToHtml } from '../../../lib/markdown';
import TableOfContents from '../../../components/TableOfContents';

export async function generateStaticParams() {
	return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const params = await props.params;
	const post = readPostBySlug(params.slug);
	
	if (!post) {
		return {
			title: 'Page Not Found | DevLog Hub'
		};
	}
	
	return {
		title: `${post.frontmatter.Title} | DevLog Hub`,
		description: post.excerpt,
		keywords: post.frontmatter.Tags?.join(', '),
		authors: [{ name: post.frontmatter.Author || 'DevLog Hub' }],
		openGraph: {
			title: post.frontmatter.Title,
			description: post.excerpt,
			type: 'article',
			publishedTime: post.dateISO,
			modifiedTime: post.dateISO,
			authors: [post.frontmatter.Author || 'DevLog Hub'],
			tags: post.frontmatter.Tags,
			siteName: 'DevLog Hub',
			images: [
				{
					url: '/og-image.jpg',
					width: 1200,
					height: 630,
					alt: post.frontmatter.Title,
				}
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.frontmatter.Title,
			description: post.excerpt,
			images: ['/og-image.jpg'],
			creator: '@devloghub',
		},
		alternates: {
			canonical: `https://devlog-hub.vercel.app/article/${params.slug}`,
		},
	};
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	const post = readPostBySlug(params.slug);
	if (!post) return notFound();
	const html = await renderMarkdownToHtml(post.content);

	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-4xl mx-auto px-6 py-12">
				<article>
					<header className="mb-12 pb-8 border-b border-gray-200">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
							{post.frontmatter.Title}
						</h1>
						<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
							<span>Date: {new Date(post.dateISO).toLocaleDateString('en-US', { 
								year: 'numeric', 
								month: 'long', 
								day: 'numeric' 
							})}</span>
							<span>•</span>
							<span>Estimated Reading Time: {post.readingMinutes} min</span>
							{post.frontmatter.Author && (
								<>
									<span>•</span>
									<span>Author: {post.frontmatter.Author}</span>
								</>
							)}
						</div>
						
						{(post.frontmatter.Tags || post.frontmatter.Column) && (
							<div className="flex flex-wrap items-center gap-2 mt-4">
								{post.frontmatter.Column && (
									<span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
										{post.frontmatter.Column}
									</span>
								)}
								{(post.frontmatter.Tags || []).map(tag => (
									<Link 
										key={tag} 
										href={`/tags/${encodeURIComponent(tag)}`}
										className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
									>
										#{tag}
									</Link>
								))}
							</div>
						)}
					</header>
					
					<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
				</article>
				
				{/* 目录组件 */}
				<TableOfContents content={html} />
			</div>
		</div>
	);
}