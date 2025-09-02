import Link from 'next/link';
import { getAllPosts } from '../lib/markdown';
import WelcomeSection from '../components/WelcomeSection';
import ClientPagination from '../components/ClientPagination';

const POSTS_PER_PAGE = 5;

export default function HomePage() {
	const allPosts = getAllPosts().sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
	const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
	
	return (
		<div>
			<WelcomeSection />
			<ClientPagination 
				allPosts={allPosts} 
				postsPerPage={POSTS_PER_PAGE}
				totalPages={totalPages}
			/>
		</div>
	);
}