"use client";

import { useLanguage } from "./LanguageContext";

export default function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="sticky bottom-0 z-50 w-full bg-red-800 px-4 py-2 text-center text-xs text-white shadow-md sm:static sm:text-sm">
      <p>{t.warning.portfolioDisclaimer}</p>
    </div>
  );
}
