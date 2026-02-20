"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

/**
 * Render a localized sign-in prompt containing a link to /login.
 *
 * The message is presented as a centered paragraph and includes a visually emphasized link.
 *
 * @returns A JSX element containing a centered paragraph with localized text and a styled link to `/login`
 */
function LoginMessage() {
	const { t } = useLanguage();

	return (
		<div className="grid bg-primary-800">
			<p className="self-center py-12 text-center text-xl">
				{t.reservationForm.loginPrompt.split("{loginLink}").map((part, i, arr) =>
					i < arr.length - 1 ? (
						<Fragment key={i}>
							{part}
							<Link href="/login" className="text-accent-500 underline">
								{t.reservationForm.loginLinkText}
							</Link>
						</Fragment>
					) : (
						<Fragment key={i}>{part}</Fragment>
					)
				)}
			</p>
		</div>
	);
}

export default LoginMessage;