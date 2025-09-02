import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTags } from '../../lib/markdown';

export const metadata: Metadata = {
	title: '标签',
	description: '按标签分类的技术文章，快速找到你感兴趣的内容。',
	openGraph: {
		title: '标签 - DevLog Hub',
		description: '按标签分类的技术文章，快速找到你感兴趣的内容。',
		type: 'website',
	},
};

export default function TagsPage() {
	const tags = Array.from(getAllTags().entries()).sort((a,b) => b[1]-a[1]);
	const max = Math.max(1, ...tags.map(t => t[1]));
	
	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-4xl mx-auto px-6 py-12">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">Tags</h1>
					<p className="text-gray-600">探索不同主题的文章内容</p>
				</div>
				
				<div className="bg-gray-50 rounded-lg p-8">
					<div className="flex flex-wrap gap-4">
						{tags.map(([name, count]) => {
							const scale = 0.875 + (count / max) * 0.5; // 0.875rem ~ 1.375rem
							return (
								<Link 
									key={name} 
									href={`/tags/${encodeURIComponent(name)}`} 
									style={{ fontSize: `${scale}rem` }} 
									className="inline-block px-4 py-2 bg-white text-blue-600 rounded-full border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium"
								>
									#{name} ({count})
								</Link>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	);
}