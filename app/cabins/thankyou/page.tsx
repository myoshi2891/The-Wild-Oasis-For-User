// TODO: サーバーサイド i18n 導入後、クライアントコンポーネントを別ファイルに抽出し
// このページを Server Component に移行する
"use client";

import Link from "next/link";
import { useLanguage } from "../../_components/LanguageContext";

/**
 * Renders a centered reservation confirmation with a link to manage reservations.
 *
 * @returns The page content: a centered confirmation heading and a link to the reservations management page.
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