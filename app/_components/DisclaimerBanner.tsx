"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Renders a responsive, full-width disclaimer banner showing a portfolio warning message.
 *
 * Displays the localized `t.warning.portfolioDisclaimer` when available; otherwise falls back to a built-in default disclaimer. The banner is styled for a fixed bottom position on small screens and static placement on larger screens.
 *
 * @returns A JSX element containing the styled disclaimer banner.
 */
export default function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="sticky bottom-0 z-50 w-full bg-red-800 px-4 py-2 text-center text-xs text-white shadow-md sm:static sm:text-sm">
      <p>{t.warning.portfolioDisclaimer}</p>
    </div>
  );
}