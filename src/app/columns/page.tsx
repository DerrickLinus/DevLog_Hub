import Link from 'next/link';
import { getAllColumns, getAllPosts } from '../../lib/markdown';

// 模拟的层级结构数据，基于现有的专栏
const getColumnHierarchy = () => {
	const posts = getAllPosts();
	const hierarchy: Record<string, { count: number; subcategories?: Record<string, number> }> = {};
	
	// 根据文章的专栏和标签构建层级结构
	posts.forEach(post => {
		const column = post.frontmatter.Column;
		const tags = post.frontmatter.Tags || [];
		
		if (column) {
			if (!hierarchy[column]) {
				hierarchy[column] = { count: 0, subcategories: {} };
			}
			hierarchy[column].count++;
			
			// 使用标签作为子分类
			tags.forEach(tag => {
				if (!hierarchy[column].subcategories![tag]) {
					hierarchy[column].subcategories![tag] = 0;
				}
				hierarchy[column].subcategories![tag]++;
			});
		}
	});
	
	return hierarchy;
};

export default function ColumnsPage() {
	const hierarchy = getColumnHierarchy();
	
	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-4xl mx-auto px-6 py-12">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">专栏</h1>
					<p className="text-gray-600">按主题分类的文章系列</p>
				</div>
				
				<div className="bg-gray-50 rounded-lg p-6">
					<div className="space-y-4">
						{Object.entries(hierarchy).map(([columnName, data]) => (
							<div key={columnName} className="space-y-2">
								{/* 主分类 */}
								<div className="flex items-center space-x-3 py-2">
									<span className="text-gray-500">
										<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
										</svg>
									</span>
									<Link 
										href={`/columns/${encodeURIComponent(columnName)}`}
										className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
									>
										{columnName}
									</Link>
									<span className="text-gray-500 text-sm">({data.count})</span>
								</div>
								
								{/* 子分类 */}
								{data.subcategories && Object.entries(data.subcategories).map(([subName, subCount]) => (
									<div key={subName} className="flex items-center space-x-3 py-1 pl-8">
										<span className="text-gray-400">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
											</svg>
										</span>
										<Link 
											href={`/tags/${encodeURIComponent(subName)}`}
											className="text-gray-700 hover:text-blue-600 transition-colors"
										>
											{subName}
										</Link>
										<span className="text-gray-500 text-sm">({subCount})</span>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}