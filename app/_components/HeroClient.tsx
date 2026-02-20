"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function HeroClient() {
	const { t } = useLanguage();

	return (
		<div className="animate-fade-in-up relative z-10 flex min-h-screen flex-col-reverse items-center justify-center text-center gap-10">
			<Link
				href="/cabins"
				className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
			>
				{t.home.cta}
			</Link>
			<h1 className="text-4xl font-normal tracking-tight text-primary-50 sm:text-6xl md:text-8xl">
				{t.home.title}
			</h1>
		</div>
	);
}
