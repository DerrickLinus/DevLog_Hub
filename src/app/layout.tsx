import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
	title: {
		template: '%s | DevLog Hub',
		default: 'DevLog Hub - 个人技术博客',
	},
	description: '个人技术博客，专注于通信+AI技术分享，记录学习笔记与技术思考。涵盖信道编译码技术、前端开发、算法等内容。',
	keywords: ['技术博客', '通信技术', 'AI', '前端开发', '信道编码', '算法', 'Next.js', 'React'],
	authors: [{ name: 'Derrick Linus' }],
	creator: 'Derrick Linus',
	publisher: 'DevLog Hub',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: 'website',
		locale: 'zh_CN',
		title: 'DevLog Hub - 个人技术博客',
		description: '个人技术博客，专注于通信+AI技术分享，记录学习笔记与技术思考。',
		siteName: 'DevLog Hub',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'DevLog Hub',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'DevLog Hub - 个人技术博客',
		description: '个人技术博客，专注于通信+AI技术分享，记录学习笔记与技术思考。',
		images: ['/og-image.jpg'],
		creator: '@devloghub',
	},
	verification: {
		google: 'your-google-verification-code',
		yandex: 'your-yandex-verification-code',
	},
	alternates: {
		types: {
			'application/rss+xml': [{ url: '/rss.xml', title: 'DevLog Hub RSS Feed' }],
		},
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh-CN">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#2563eb" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
			</head>
			<body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
				<Navbar />
				<main>{children}</main>
				
				{/* JSON-LD 结构化数据 */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Blog',
							name: 'DevLog Hub',
							description: '个人技术博客，专注于通信+AI技术分享',
							url: 'https://devlog-hub.vercel.app',
							author: {
								'@type': 'Person',
								name: 'Derrick Linus',
								jobTitle: '研究生',
								knowsAbout: ['通信技术', 'AI', '信道编码', '前端开发'],
							},
							inLanguage: 'zh-CN',
							publisher: {
								'@type': 'Organization',
								name: 'DevLog Hub',
								logo: {
									'@type': 'ImageObject',
									url: 'https://devlog-hub.vercel.app/logo.png',
								},
							},
						}),
					}}
				/>
			</body>
		</html>
	);
}