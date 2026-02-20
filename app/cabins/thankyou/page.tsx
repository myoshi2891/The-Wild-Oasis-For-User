"use client";

import Link from "next/link";
import { useLanguage } from "../../_components/LanguageContext";

/**
 * Render a centered reservation confirmation with a link to manage reservations.
 *
 * @returns A JSX element containing a confirmation heading and a link to the reservations management page.
 */
export default function Page() {
	const { t } = useLanguage();

	return (
		<div className="mt-4 space-y-6 text-center">
			<h1 className="text-3xl font-semibold">
				{t.thankYou.title}
			</h1>
			<Link
				href="/account/reservations"
				className="inline-block text-xl text-accent-500 underline"
			>
				{t.thankYou.manageLink}
			</Link>
		</div>
	);
}