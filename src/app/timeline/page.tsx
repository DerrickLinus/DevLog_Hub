import Link from 'next/link';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { groupPostsByYearMonth } from '../../lib/markdown';

export const metadata: Metadata = {
	title: '时间线',
	description: '按时间顺序浏览所有技术文章，回顾学习轨迹和技术成长过程。',
	openGraph: {
		title: '时间线 - DevLog Hub',
		description: '按时间顺序浏览所有技术文章，回顾学习轨迹和技术成长过程。',
		type: 'website',
	},
};

export default function TimelinePage() {
	const grouped = groupPostsByYearMonth();
	const years = Object.keys(grouped).sort((a,b) => Number(b) - Number(a));
	
	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-4xl mx-auto px-6 py-12">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">归档</h1>
					<p className="text-gray-600">按时间顺序浏览所有文章</p>
				</div>
				
				<div className="relative">
					<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
					
					<div className="space-y-12">
						{years.map((year) => {
							const months = Object.keys(grouped[year]).sort((a,b) => Number(b) - Number(a));
							return (
								<section key={year} className="relative">
									<div className="flex items-center mb-6">
										<div className="absolute left-3 w-2 h-2 bg-blue-600 rounded-full z-10" />
										<h2 className="text-2xl font-bold text-gray-900 ml-12">{year}</h2>
									</div>
									
									<div className="ml-12 space-y-8">
										{months.map((m) => (
											<div key={`${year}-${m}`}>
												<h3 className="text-lg font-semibold text-gray-700 mb-4">
													{dayjs(`${year}-${m}-01`).format('MMMM')}
												</h3>
												<div className="space-y-3">
													{grouped[year][m].map((p) => (
														<div key={p.slug} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
															<div className="flex-shrink-0 text-sm text-gray-500 w-20">
																{dayjs(p.dateISO).format('MMM DD')}
															</div>
															<div className="flex-grow">
																<Link 
																	href={`/article/${p.slug}`} 
																	className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
																>
																	{p.frontmatter.Title}
																</Link>
																<p className="text-sm text-gray-600 mt-1 line-clamp-2">
																	{p.excerpt}
																</p>
															</div>
														</div>
													))}
												</div>
											</div>
										))}
									</div>
								</section>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}