import Link from 'next/link';
import { getAllPosts } from '../../../lib/markdown';

export default function ColumnArticlesPage({ params }: { params: { name: string } }) {
	const decoded = decodeURIComponent(params.name);
	const posts = getAllPosts().filter(p => p.frontmatter.Column === decoded);
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">专栏：{decoded}</h1>
			<ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
				{posts.map((p) => (
					<li key={p.slug} className="p-4 hover:bg-gray-50">
						<h2 className="text-lg font-medium">
							<Link href={`/article/${p.slug}`} className="hover:text-sky-600">{p.frontmatter.Title}</Link>
						</h2>
						<p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
