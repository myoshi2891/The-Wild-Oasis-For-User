"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./_components/LanguageContext";

import bg from "@/public/bg.png";

/**
 * Renders the landing page hero with a full-bleed background image, centered heading, and a CTA linking to /cabins.
 *
 * @returns The page's JSX element containing the hero section.
 */
export default function Page() {
	const { t } = useLanguage();

	return (
		<div className="relative min-h-screen">
			<Image
				src={bg}
				fill
				quality={80}
				placeholder="blur"
				className="object-cover object-top"
				alt="Mountains and forests with two cabins"
			/>

			<div className="animate-fade-in-up relative z-10 flex min-h-screen flex-col items-center justify-center text-center gap-10">
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
		</div>
	);
}