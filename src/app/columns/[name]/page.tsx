import Link from 'next/link';
import { getAllPosts } from '../../../lib/markdown';

export default async function ColumnArticlesPage(props: { params: Promise<{ name: string }> }) {
	const { name } = await props.params;
	const decoded = decodeURIComponent(name);
	const posts = getAllPosts().filter(p => p.frontmatter.Column === decoded);
	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-5xl mx-auto px-6 py-12">
				<header className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">📁 {decoded}</h1>
						<p className="text-gray-600 mt-1">共 {posts.length} 篇文章</p>
					</div>
					<Link href="/columns" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">← 返回 Columns</Link>
				</header>

				<div className="space-y-8">
					{posts.map((p) => (
						<article key={p.slug} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow duration-200">
							<header className="mb-4 md:mb-6">
								<h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 leading-tight">
									<Link href={`/article/${p.slug}`} className="hover:text-blue-600 transition-colors">{p.frontmatter.Title}</Link>
								</h2>
								<p className="text-base md:text-lg text-gray-600 leading-relaxed line-clamp-3">{p.excerpt}</p>
							</header>

							<footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm md:text-base text-gray-500">
								<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
									<span>
										Date: {new Date(p.dateISO).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
									</span>
									<span>Reading Time：{p.readingMinutes} 分钟</span>
									{p.frontmatter.Author && <span>Author: {p.frontmatter.Author}</span>}
								</div>

								<div className="flex flex-wrap items-center gap-2">
									{p.frontmatter.Column && (
										<span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">{p.frontmatter.Column}</span>
									)}
									{(p.frontmatter.Tags || []).slice(0, 4).map(tag => (
										<Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">
											#{tag}
										</Link>
									))}
								</div>
							</footer>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
