"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

/**
 * Renders a styled message that prompts the user to sign in and provides a link to the login page so they can reserve a cabin.
 *
 * @returns A JSX element containing a centered paragraph with a link to `/login` styled for emphasis.
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