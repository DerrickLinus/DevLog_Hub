import Link from 'next/link';
import { getAllPosts } from '../lib/markdown';
import WelcomeSection from '../components/WelcomeSection';

export default function HomePage() {
	const posts = getAllPosts().sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
	
	return (
		<div>
			<WelcomeSection />
			
			<div className="max-w-4xl mx-auto px-4 py-2">
				<div className="space-y-8">
					{posts.map((p) => (
						<article key={p.slug} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
							<header className="mb-4">
								<h2 className="text-xl font-semibold text-gray-900 mb-2">
									<Link href={`/article/${p.slug}`} className="hover:text-blue-600 transition-colors">
										{p.frontmatter.Title}
									</Link>
								</h2>
								<p className="text-gray-600 leading-relaxed line-clamp-3">
									{p.excerpt}
								</p>
							</header>
							
							<footer className="flex items-center justify-between text-sm text-gray-500">
								<div className="flex items-center space-x-4">
									<span>Date: {new Date(p.dateISO).toLocaleDateString('en-US', { 
										year: 'numeric', 
										month: 'short', 
										day: 'numeric' 
									})}</span>
									<span>Estimated Reading Time: {p.readingMinutes} min</span>
									{p.frontmatter.Author && <span>Author: {p.frontmatter.Author}</span>}
								</div>
								
								<div className="flex items-center space-x-2">
									{p.frontmatter.Column && (
										<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
											{p.frontmatter.Column}
										</span>
									)}
									{(p.frontmatter.Tags || []).slice(0, 3).map(tag => (
										<Link 
											key={tag} 
											href={`/tags/${encodeURIComponent(tag)}`}
											className="text-blue-600 hover:text-blue-800 transition-colors"
										>
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