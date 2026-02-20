"use client";

import { useLanguage } from "./LanguageContext";

/**
 * Displays a responsive, full-width disclaimer banner showing a portfolio notice.
 *
 * The banner shows the translation at `t.warning?.portfolioDisclaimer` when available; otherwise it displays a default English disclaimer: "This website is a portfolio project and is not actively operated. We do not take any responsibility for the handling of personal information or provided data."
 *
 * @returns A React element containing a bottom-positioned disclaimer banner with centered text.
 */
export default function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="bg-red-800 text-white text-xs sm:text-sm text-center py-2 px-4 shadow-md w-full z-50 fixed bottom-0 left-0 sm:static">
      <p>{t.warning?.portfolioDisclaimer || "This website is a portfolio project and is not actively operated. We do not take any responsibility for the handling of personal information or provided data."}</p>
    </div>
  );
}