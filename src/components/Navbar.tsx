"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
	{ href: '/', label: 'Posts' },
	{ href: '/columns', label: 'Columns' },
	{ href: '/timeline', label: 'Archive' },
	{ href: '/tags', label: 'Tags' },
];

export default function Navbar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
			<div className="mx-auto max-w-6xl px-6 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<Image 
							src="/Avatar.jpg" 
							alt="DevLog Hub Avatar" 
							width={32} 
							height={32} 
							className="rounded-full object-cover"
							priority
						/>
						<span className="text-2xl font-bold text-gray-900">DevLog Hub</span>
					</Link>
					
					<button 
						aria-label="Menu" 
						className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" 
						onClick={() => setOpen(v => !v)}
					>
						<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
						</svg>
					</button>
					
					<nav className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link 
								key={item.href} 
								href={item.href} 
								className={`text-lg font-medium transition-colors hover:text-blue-600 ${
									pathname === item.href 
										? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
										: 'text-gray-600'
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
				
				{open && (
					<div className="md:hidden mt-4 pt-4 border-t border-gray-100">
						<nav className="flex flex-col space-y-3">
							{navItems.map((item) => (
								<Link 
									key={item.href} 
									href={item.href} 
									className={`text-lg font-medium transition-colors hover:text-blue-600 ${
										pathname === item.href ? 'text-blue-600' : 'text-gray-600'
									}`}
									onClick={() => setOpen(false)}
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}