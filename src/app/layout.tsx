import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
	title: "DevLog Hub",
	description: "个人技术博客 - 记录学习笔记与技术思考",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh-CN">
			<body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	);
}