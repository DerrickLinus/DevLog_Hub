"use client";
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { PostItem } from '../lib/markdown';
import Pagination from './Pagination';

interface ClientPaginationProps {
	allPosts: PostItem[];
	postsPerPage: number;
	totalPages: number;
}

export default function ClientPagination({ allPosts, postsPerPage, totalPages }: ClientPaginationProps) {
	const [currentPage, setCurrentPage] = useState(1);
	
	const posts = useMemo(() => {
		const startIndex = (currentPage - 1) * postsPerPage;
		const endIndex = startIndex + postsPerPage;
		return allPosts.slice(startIndex, endIndex);
	}, [allPosts, currentPage, postsPerPage]);
	
			return (
			<div className="max-w-5xl mx-auto px-6 py-2">
				<div className="space-y-10">
					{posts.map((p) => (
						<article key={p.slug} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-200">
							<header className="mb-6">
								<h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 leading-tight">
									<Link href={`/article/${p.slug}`} className="hover:text-blue-600 transition-colors">
										{p.frontmatter.Title}
									</Link>
								</h2>
								<p className="text-lg text-gray-600 leading-relaxed line-clamp-3">
									{p.excerpt}
								</p>
							</header>
							
							<footer className="flex items-center justify-between text-base text-gray-500">
								<div className="flex items-center space-x-6">
									<span>Date: {new Date(p.dateISO).toLocaleDateString('en-US', { 
										year: 'numeric', 
										month: 'short', 
										day: 'numeric' 
									})}</span>
									<span>Estimated Reading Time: {p.readingMinutes} min</span>
									{p.frontmatter.Author && <span>Author: {p.frontmatter.Author}</span>}
								</div>
								
								<div className="flex items-center space-x-3">
									{p.frontmatter.Column && (
										<span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
											{p.frontmatter.Column}
										</span>
									)}
									{(p.frontmatter.Tags || []).slice(0, 3).map(tag => (
										<Link 
											key={tag} 
											href={`/tags/${encodeURIComponent(tag)}`}
											className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
										>
											#{tag}
										</Link>
									))}
								</div>
							</footer>
						</article>
					))}
				</div>
			
			<Pagination 
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
