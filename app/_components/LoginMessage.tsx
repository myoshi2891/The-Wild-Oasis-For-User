"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

/**
 * Display a localized message prompting the user to sign in with a link to /login.
 *
 * @returns A JSX element containing a centered paragraph with localized text and a prominently styled link to `/login`.
 */
function LoginMessage() {
	const { t } = useLanguage();

	return (
		<div className="grid bg-primary-800">
			<p className="self-center py-12 text-center text-xl">
				{t.reservationForm.loginPrompt1}{" "}
				<Link href="/login" className="text-accent-500 underline">
					{t.reservationForm.loginPrompt2}
				</Link>{" "}
				{t.reservationForm.loginPrompt3}
			</p>
		</div>
	);
}

export default LoginMessage;